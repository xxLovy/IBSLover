import type { Request, Response } from "express";
import { GOOGLE_URL, keywords } from "../../constants";
import axios from "axios";
import { ToiletByGoogle, type IToilet } from "../../database/models/toilet.model";
import { checkAPIKeyLimit } from "../../middlewares/apiLimiter";

// export const getGooglePlaces = async (req: Request, res: Response) => {
//     try {
//         const url = GOOGLE_URL;
//         const location = req.query.location as string;

//         if (!location) {
//             return res.status(400).send('Location parameter is required');
//         }

//         const locationParts = location.split(',');
//         if (locationParts.length !== 2) {
//             return res.status(400).send('Location parameter format is invalid');
//         }

//         const latitude = Number(locationParts[0]);
//         const longitude = Number(locationParts[1]);

//         if (isNaN(latitude) || isNaN(longitude)) {
//             return res.status(400).send('Location coordinates are invalid');
//         }

//         const limitCheck = await checkAPIKeyLimit();
//         if (!limitCheck) {
//             return res.status(429).send('API usage limit exceeded for today.');
//         }

//         let allPlaces: IToilet[] = [];

//         for (const keyword of keywords) {
//             const params = {
//                 location: `${latitude},${longitude}`,
//                 keyword,
//             };

//             const response = await axios.get(url, { params });
//             const tempPlaces = response.data.results.map((place: any) => {
//                 const toilet: IToilet = {
//                     name: place.name,
//                     description: place.vicinity,
//                     location: {
//                         coordinates: [place.geometry.location.lng, place.geometry.location.lat]
//                     },
//                     lastUpdateTime: new Date().toISOString(),
//                     isOpening: Boolean(place.opening_hours?.open_now),
//                     isRemoved: false,
//                     votesCount: 0,
//                     isFromUser: false,
//                 };
//                 return toilet;
//             });

//             if (response.data.results && response.data.results.length > 0) {
//                 tempPlaces.forEach((result: any) => {
//                     result.keyword = keyword;
//                 });
//                 allPlaces.push(...tempPlaces);
//             }
//         }

//         res.json(allPlaces);
//     } catch (error) {
//         console.error('Error fetching from Google:', error);
//         res.status(500).send('An error occurred when fetching from Google');
//     }
// };



export const getGooglePlaces = async (req: Request, res: Response) => {
    try {
        let allToilets = await ToiletByGoogle.find({})
        // get all user created toilets that are not removed
        const toilets = allToilets.filter(item => !item.isRemoved);

        res.status(200).json(toilets);
    } catch (error) {
        console.error('Error retrieving toilets:', error);
        res.status(500).send('An error occurred while retrieving the toilets.');
    }
}