import type { Request, Response } from "express"
import { GOOGLE_URL, keywords } from "../constants"
import axios from "axios"
import type { IToilet } from "../database/models/toilet.model"


export const getGooglePlaces = async (req: Request, res: Response) => {
    try {
        const url = GOOGLE_URL
        const locationParts = req.params.location.split(',');
        const latitude = Number(locationParts[0])
        const longitude = Number(locationParts[1])
        // TODO: use DB to cache

        let allPlaces: IToilet[] = []
        for (const keyword of keywords) {
            const params = {
                location: `${latitude},${longitude}`,
                keyword,
            };

            const response = await axios.get(url, { params });
            let tempPlaces = response.data.results.map((place: any) => {
                let toilet: IToilet = {
                    name: place.name,
                    description: place.vicinity,
                    location: {
                        coordinates: [place.geometry.location.lng, place.geometry.location.lat]
                    },
                    lastUpdateTime: String(Date.now()),
                    // openingHours?: ,
                    isOpening: Boolean(place.opening_hours.open_now),
                    isRemoved: false,
                    votesCount: 0,
                    isFromUser: false,
                }
                return toilet
            })

            if (response.data.results && response.data.results.length > 0) {
                // filter all operating toilets
                // const filteredResults = tempPlaces.filter((place: IToilet) => place.isOpening);
                const filteredResults = tempPlaces;

                filteredResults.forEach((result: any) => {
                    result.keyword = keyword;
                });
                allPlaces.push(...filteredResults);
            }
        }
        res.json(allPlaces)

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred when fetching from Google');
    }

}