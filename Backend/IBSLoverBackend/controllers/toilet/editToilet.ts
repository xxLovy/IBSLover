import type { Request, Response } from "express";
import type { IToilet } from "../../database/models/toilet.model";
import Toilet from "../../database/models/toilet.model";


export const editToilet = async (req: Request, res: Response) => {
    try {
        const { userId, toiletId } = req.params;
        const { toilet } = req.body as { toilet: IToilet }
        toilet.users!.push(userId)
        const editedToilet = await Toilet.findByIdAndUpdate(toiletId, toilet, { new: true });
        res.status(200).json(editedToilet);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while editing the toilet.');
    }
}