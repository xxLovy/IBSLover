import type { Request, Response } from "express";
import Toilet from "../../database/models/toilet.model"


export const getUserCreatedToilets = async (req: Request, res: Response) => {
    try {
        let allToilets = await Toilet.find({})
        // get all user created toilets that are not removed
        const toilets = allToilets.filter(item => !item.isRemoved);

        res.status(200).json(toilets);
    } catch (error) {
        console.error('Error retrieving toilets:', error);
        res.status(500).send('An error occurred while retrieving the toilets.');
    }
}