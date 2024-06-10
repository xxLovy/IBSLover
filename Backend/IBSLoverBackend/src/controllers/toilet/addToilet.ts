import type { Request, Response } from "express";
import Toilet, { type IToilet } from "../../database/models/toilet.model";
import { MAX_DISTANCE } from "../../constants";


export const addToilet = async (req: Request, res: Response) => {
    try {
        const { toilet } = req.body as { toilet: IToilet };
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).send("User ID is required");
        }

        let nearbyToilets = await Toilet.find({
            'location': {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [toilet.location.coordinates[0], toilet.location.coordinates[1]]
                    },
                    $maxDistance: MAX_DISTANCE
                }
            },
            isFromUser: true,
            isRemoved: { $ne: true } // Ensure the removing property is not true
        });
        console.log(toilet)

        if (nearbyToilets.length > 0) {
            const toiletIds = nearbyToilets.map(toilet => toilet._id.toString());
            return res.status(201).json(toiletIds);
        } else {
            const newToilet = new Toilet({
                ...toilet
            });
            newToilet.users.push(userId);
            console.log(newToilet)
            await newToilet.save();
            res.status(200).json(newToilet);
        }
    } catch (error) {
        console.error('Error adding/updating toilet location:', error);
        res.status(500).send('An error occurred while adding/updating the toilet location.');
    }
};