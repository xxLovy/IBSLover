import dotenv from 'dotenv';
dotenv.config();

export const IP_REQUEST_LIMIT = 1;
export const IP_REQUEST_EXPIRE = 10;
export const DAILY_LIMIT = 1000;
export const MAX_DISTANCE = 20;
export const keywords = [
    "Starbucks", "Trader Joe's", "McDonald's", "Safeway", "Walmart", "Hmart", "99 Ranch", "Costco"
];
const radius = 1000;
const KEY = process.env.GOOGLE_MAPS_API_KEY;
export const URL = process.env.MONGODB_URI;
export const PORT = 3030

export const GOOGLE_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${KEY}&radius=${radius}`


