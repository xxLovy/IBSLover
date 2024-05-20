import type { Request, Response } from "express";
import Toilet from "../../database/models/toilet.model";


export const voteToilet = async (req: Request, res: Response) => {
    try {
        const { userId, toiletId } = req.params;

        if (!userId) {
            return res.status(400).send("User ID is required");
        }

        let votingToilet = await Toilet.findById(toiletId);
        if (!votingToilet) {
            return res.status(404).send("Toilet not found");
        }

        votingToilet.users.push(userId);
        votingToilet.lastUpdateTime = new Date().toISOString();
        votingToilet.votesCount += 1;
        await votingToilet.save();

        res.status(200).json({ message: "Vote successful", votingToilet });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while voting for the toilet.');
    }
};