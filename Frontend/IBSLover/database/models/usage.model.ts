import { Schema, model, models } from "mongoose";

const UseageSchema = new Schema({
    count: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now() }
})

export interface IUseage {
    count: number,
    date: Date
}

const Usage = models?.Usage || model('Usage', UseageSchema)
export default Usage;