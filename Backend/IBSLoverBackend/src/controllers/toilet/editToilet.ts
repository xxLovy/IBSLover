import type { Request, Response } from "express";
import Toilet, { type IToilet } from "../../database/models/toilet.model";


export const editToilet = async (req: Request, res: Response) => {
    try {
        const { userId, toiletId } = req.params;
        let { toilet } = req.body as { toilet: IToilet };
        const tempToilet = await Toilet.findById(toiletId)
        toilet = {
            ...tempToilet.toObject(),
            ...toilet
        }

        if (!userId) {
            return res.status(400).send("User ID is required");
        }

        toilet.users!.push(userId);
        const editedToilet = await Toilet.findByIdAndUpdate(toiletId, toilet, { new: true });

        if (!editedToilet) {
            return res.status(404).send("Toilet not found");
        }

        res.status(200).json(editedToilet);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while editing the toilet.');
    }
};
