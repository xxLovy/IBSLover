import type { Request, Response } from "express";
import Toilet from "../../database/models/toilet.model";


export const removeToilet = async (req: Request, res: Response) => {
    try {
        const { userId, toiletId, msg } = req.params
        let removingToilet = await Toilet.findById(toiletId);
        removingToilet.removeMsg = msg;
        removingToilet.lastUpdateTime = new Date().toISOString();
        removingToilet.isRemoved = true;
        removingToilet.users.push(userId)

        await removingToilet.save()
        res.status(200).json({ message: "Remove successful", removingToilet });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while removing for the toilet.');
    }
}