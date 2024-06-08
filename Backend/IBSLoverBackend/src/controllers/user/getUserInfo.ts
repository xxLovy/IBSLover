import type { Request, Response } from "express";
import User from "../../database/models/user.model";


export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const { kindeId } = req.params
        const user = await User.findOne({ kindeId })
        if (!user) {
            res.status(404)
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        console.log(error)
    }
}