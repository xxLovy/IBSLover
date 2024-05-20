import { Schema, models, model } from "mongoose";


const UserSchema = new Schema({
    username: { type: String, required: true },
    toilets: {
        type: [String]
    },
    favorites: {
        type: [String]
    }
})

export interface IUser extends Document {
    username: string;
    toilets?: string[];
    favorites?: string[];
}

const User = models?.User || model<IUser>('User', UserSchema);
export default User;