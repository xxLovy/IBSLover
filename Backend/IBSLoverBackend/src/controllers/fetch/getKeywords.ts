import type { Request, Response } from "express"
import { keywords } from "../../constants"


export const getKeyWords = async (req: Request, res: Response) => {
    try {
        res.status(200).json(keywords);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching keywords');
    }
}