import type { Request, Response } from "express";
import Toilet from "../../database/models/toilet.model";


export const removeToilet = async (req: Request, res: Response) => {
    try {
        const { userId, toiletId, msg } = req.params;

        if (!userId) {
            return res.status(400).send("User ID is required");
        }
        console.log(toiletId)
        let removingToilet = await Toilet.findById(toiletId);
        if (!removingToilet) {
            return res.status(404).send("Toilet not found");
        }

        removingToilet.removeMsg = msg;
        removingToilet.lastUpdateTime = new Date().toISOString();
        removingToilet.isRemoved = true;
        removingToilet.users.push(userId);

        await removingToilet.save();
        res.status(200).json(toiletId);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while removing the toilet.');
    }
};