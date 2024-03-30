const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const Redis = require('ioredis');
require('dotenv').config();

const app = express();
app.use(cors());

const radius = 1000;
const KEY = process.env.GOOGLE_MAPS_API_KEY;
const keywords = [
    'Starbucks',
    'McDonald\'s',
    'Walmart',
    'City Supper',
    'IKEA',
];
const IP_REQUEST_LIMIT = 1
const IP_REQUEST_EXPIRE = 3
const DAILY_LIMIT = 100

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const UsageSchema = new mongoose.Schema({
    count: Number,
    date: Date
});

const Usage = mongoose.model('Usage', UsageSchema);

const redis = new Redis(process.env.REDIS_URI);

async function checkIPRequestLimit(ip) {
    const ipKey = `requests:${ip}`;
    const ipCount = await redis.get(ipKey);
    if (ipCount && parseInt(ipCount) >= IP_REQUEST_LIMIT) {
        return false;
    }
    await redis.incr(ipKey);
    await redis.expire(ipKey, IP_REQUEST_EXPIRE);
    return true;
}

async function checkAPIKeyLimit() {
    const today = new Date().toISOString().split('T')[0];
    let existingRecord = await Usage.findOne({ date: today });

    if (existingRecord) {
        existingRecord.count = parseInt(existingRecord.count) + 1;
        if (existingRecord.count > DAILY_LIMIT) {
            return false;
        }
        await existingRecord.save();
    } else {
        await Usage.create({ count: 1, date: today });
    }

    return true;
}



app.get('/search', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

        const ip = req.ip;

        const ipAllowed = await checkIPRequestLimit(ip);
        if (!ipAllowed) {
            res.status(429).send('IP usage exceeded');
            return;
        }

        const apiKeyAllowed = await checkAPIKeyLimit();
        if (!apiKeyAllowed) {
            res.status(429).send('API usage exceeded for today');
            return;
        }

        let allResults = [];
        for (const keyword of keywords) {
            const params = {
                location: `${latitude},${longitude}`,
                radius: radius,
                key: KEY,
                keyword: keyword,
            };

            const response = await axios.get(url, { params });
            if (response.data.results && response.data.results.length > 0) {
                const filteredResults = response.data.results.filter(place => {
                    return true; // 全返回
                });
                allResults.push(...filteredResults);
            }
        }

        const sortedResults = sortByDistance(allResults);
        res.json(sortedResults);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function sortByDistance(results) {
    return results.sort((a, b) => a.geometry.location.distance - b.geometry.location.distance);
}
