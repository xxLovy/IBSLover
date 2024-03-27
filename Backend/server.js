const express = require('express');
const axios = require('axios')
const cors = require('cors');
require('dotenv').config();

const radius = 1000
const KEY = process.env.GOOGLE_MAPS_API_KEY
const keywords = [
    'Starbucks',
    'McDonald\'s',
    'Walmart',
    'City Supper',
    'IKEA',
];

const app = express()
app.use(cors());


function sortByDistance(results) {
    return results.sort((a, b) => a.geometry.location.distance - b.geometry.location.distance);
}

app.get('/search', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
        for (const keyword of keywords) {
            const params = {
                location: `${latitude},${longitude}`,
                radius: radius,
                key: KEY,
                keyword: keyword,
                rankedby: 'distance'
            };
            console.log(`拼接URL：${url}?location=${params.location}&radius=${params.radius}&keyword=${params.keyword}&key=${params.key}`)
        }

        for (const keyword of keywords) {
            const params = {
                location: `${latitude},${longitude}`,
                radius: radius,
                key: KEY,
                keyword: keyword,
                rankedby: 'distance'
            };

            const response = await axios.get(baseURL, { params });
            console.log(response.results)

            if (response.data.results && response.data.results.length > 0) {
                const filteredResults = response.data.results.filter(place => {
                    return place.opening_hours && place.opening_hours.open_now; // 只返回营业的地点
                });
                allResults.push(...filteredResults);
            }
        }

        const sortedResults = sortByDistance(allResults);

        res.json(sortedResults);
        console.log(sortedResults);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }


});


const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
