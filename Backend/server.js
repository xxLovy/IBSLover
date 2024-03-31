const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const Redis = require('ioredis');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
const IP_REQUEST_EXPIRE = 10
const DAILY_LIMIT = 100

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const UsageSchema = new mongoose.Schema({
    count: Number,
    date: Date
});

const ToiletLocationSchema = new mongoose.Schema({
    coordinates: {
        type: { type: String, default: 'Point' },
        coordinates: [Number], // [longitude, latitude]
    },
    votes: { type: Number, default: 1 }, // Start with 1 vote when added
    description: String,
    name: String,
});
ToiletLocationSchema.index({ coordinates: '2dsphere' });
const ToiletLocation = mongoose.model('ToiletLocation', ToiletLocationSchema);

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
    try {
        const today = new Date().toISOString().split('T')[0];
        let existingRecord = await Usage.findOne({ date: today });

        if (existingRecord) {
            existingRecord.count += keywords.length;
            if (existingRecord.count > DAILY_LIMIT) {
                console.log(`day:${today}, used:${existingRecord.count}, limit:${DAILY_LIMIT}`)
                return false;
            }
            await existingRecord.save();
        } else {
            await Usage.create({ date: today, count: keywords.length });
        }
        console.log(`day:${today}, used:${existingRecord.count}, limit:${DAILY_LIMIT}`)
        return true;
    } catch (error) {
        console.error("Error while checking API key limit:", error);
        return false;
    }
}



// send request to Google maps
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


// Add a new toilet location
app.post('/add-toilet', async (req, res) => {
    try {
        // Ensure the request contains the required fields
        const { latitude, longitude, name, description } = req.body;
        if (!latitude || !longitude || !name) {
            return res.status(400).send('Missing required fields: latitude, longitude, and name.');
        }

        // Check if the toilet location already exists
        const existingToilet = await ToiletLocation.findOne({
            'coordinates.coordinates': [longitude, latitude],
            name: name
        });

        if (existingToilet) {
            // If the toilet location already exists, increment the vote count
            existingToilet.votes += 1;
            await existingToilet.save();
            return res.status(200).json(existingToilet);
        } else {
            // If the toilet location does not exist, create a new document and save it to the database
            const newToiletLocation = new ToiletLocation({
                coordinates: {
                    coordinates: [longitude, latitude],
                },
                name: name,
                description: description || '', // Optional field
                votes: 1, // Initial vote count
            });

            await newToiletLocation.save();
            return res.status(201).json(newToiletLocation);
        }
    } catch (error) {
        console.error('Error adding new toilet location:', error);
        return res.status(500).send('An error occurred while adding the toilet location.');
    }
});

// Get all toilets sorted by votes
app.get('/toilets', async (req, res) => {
    try {
        // Find all toilets and sort them by votes in descending order
        const toilets = await ToiletLocation.find({}).sort({ votes: -1 });
        res.json(toilets);
    } catch (error) {
        console.error('Error retrieving toilets:', error);
        res.status(500).send('An error occurred while retrieving the toilets.');
    }
});


const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function sortByDistance(results) {
    return results.sort((a, b) => a.geometry.location.distance - b.geometry.location.distance);
}
