// imports
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit')

// constants
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
const DAILY_LIMIT = 1000
const MAX_DISTANCE = 20

const app = express();
// middlewares
app.use(cors());
app.use(bodyParser.json());
const apiLimiter = rateLimit({
    windowMs: IP_REQUEST_EXPIRE * 1000,
    max: IP_REQUEST_LIMIT,
    handler: (req, res) => {
        res.status(429).send('Too many requests from this IP, please try again after a short while.');
    }
});
app.use('/search', apiLimiter);


// DB
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
    votes: { type: Number, default: 1 },
    description: String,
    name: String,
    positions: [{
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    }],
    userId: String,
});

ToiletLocationSchema.index({ coordinates: '2dsphere' });
const ToiletLocation = mongoose.model('ToiletLocation', ToiletLocationSchema);

const Usage = mongoose.model('Usage', UsageSchema);



// helper function
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
function sortByDistance(results) {
    return results.sort((a, b) => a.geometry.location.distance - b.geometry.location.distance);
}



// Routers
// send request to Google maps
app.get('/search', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

        const apiKeyAllowed = await checkAPIKeyLimit();
        if (!apiKeyAllowed) {
            res.status(430).send('API usage exceeded for today');
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

                    return true; // return all results
                });

                filteredResults.forEach(result => {
                    result.KWD = keyword;
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


// Add a new toilet location or update existing one
app.post('/add-toilet', async (req, res) => {
    try {
        const { latitude, longitude, name, description } = req.body;
        if (!latitude || !longitude || !name) {
            return res.status(400).send('Missing required fields: latitude, longitude, and name.');
        }

        // Find a nearby toilet within the range
        const nearbyToilet = await ToiletLocation.findOne({
            coordinates: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: MAX_DISTANCE
                }
            }
        })

        console.log('Nearby Toilet:', nearbyToilet);

        if (nearbyToilet) {
            // If a nearby toilet is found, increment votes and add new position to the positions list
            nearbyToilet.votes += 1;
            nearbyToilet.positions.push({ type: "Point", coordinates: [longitude, latitude] });
            await nearbyToilet.save();
            res.status(200).json(nearbyToilet);
        } else {
            // If no nearby toilet is found, create a new one
            const newToiletLocation = new ToiletLocation({
                coordinates: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
                name,
                description: description || '',
                votes: 1,
                positions: [{ type: "Point", coordinates: [longitude, latitude] }]
            });
            await newToiletLocation.save();
            res.status(201).json(newToiletLocation);
        }
    } catch (error) {
        console.error('Error adding/updating toilet location:', error);
        res.status(500).send('An error occurred while adding/updating the toilet location.');
    }
});

// Get all toilets sorted by votes with average coordinates
app.get('/toilets', async (req, res) => {
    try {
        // Find all toilets and sort them by votes in descending order
        let toilets = await ToiletLocation.find({}).sort({ votes: -1 });

        // Calculate average coordinates for each toilet
        toilets = toilets.map(toilet => {
            if (toilet.positions.length > 0) {
                const avgCoordinates = toilet.positions.reduce((acc, position) => {
                    acc[0] += position.coordinates[0];
                    acc[1] += position.coordinates[1];
                    return acc;
                }, [0, 0]);

                avgCoordinates[0] /= toilet.positions.length;
                avgCoordinates[1] /= toilet.positions.length;

                toilet.coordinates.coordinates = avgCoordinates;
            }
            return toilet;
        });

        res.json(toilets);
    } catch (error) {
        console.error('Error retrieving toilets:', error);
        res.status(500).send('An error occurred while retrieving the toilets.');
    }
});

app.get('/fetchKeywords', (req, res) => {
    try {
        res.json(keywords);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching keywords');
    }
});

// Start
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});