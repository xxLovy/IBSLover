import { Schema, models, model } from "mongoose";


const UserSchema = new Schema({
    username: { type: String, required: true },
    toilets: {
        type: [String]
    },
    favorites: {
        type: [String]
    },
    kindeId: {
        type: String, required: true
    }
})

export interface IUser extends Document {
    username: string;
    toilets?: string[];
    favorites?: string[];
    kindeId: string;
}

const User = models?.User || model<IUser>('User', UserSchema);
export default User;