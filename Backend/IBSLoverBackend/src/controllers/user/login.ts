import type { Request, Response } from "express";
import User from "../../database/models/user.model";
import type { IToilet } from "../../database/models/toilet.model";


export const login = async (req: Request, res: Response) => {
    try {
        const { kindeId, username } = req.params

        const user = await User.findOne({ kindeId })
        if (!user) {
            const newUser = new User({
                username: username,
                toilets: [],
                favorites: [],
                kindeId: kindeId
            })
            await newUser.save()
            res.status(200).json(newUser);
        } else {
            const newuser: IToilet = user
            res.status(200).json(newuser);
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred while creating the user" });
        console.log(error)
    }

}