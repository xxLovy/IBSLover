import { Schema, model, models } from "mongoose";


const ToiletsSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            // 0 for lon, 1 for lat
            type: [Number],
            required: true
        }
    },
    lastUpdateTime: { type: String, required: true },
    openingHours: { type: Date },
    isOpening: { type: Boolean },
    features: {
        women: {
            type: String,
            enum: ["yes", "no", "dontknow"],
            default: "dontknow"
        },
        men: {
            type: String,
            enum: ["yes", "no", "dontknow"],
            default: "dontknow"
        },
        accessible: {
            type: String,
            enum: ["yes", "no", "dontknow"],
            default: "dontknow"
        },
        genderNetural: {
            type: String,
            enum: ["yes", "no", "dontknow"],
            default: "dontknow"
        },
        children: {
            type: String,
            enum: ["yes", "no", "dontknow"],
            default: "dontknow"
        },
        free: {
            type: String,
            enum: ["yes", "no", "dontknow"],
            default: "dontknow"
        },
        fee: {
            type: Number
        }
    },
    isRemoved: { type: Boolean, required: true, default: false },
    votesCount: { type: Number },
    isFromUser: { type: Boolean, required: true, default: false },
    keyword: { type: String },
    users: { type: [String] },
    removeMsg: { type: String }
})

export interface IToilet {
    name: string;
    description?: string;
    location: {
        coordinates: number[]; // [longitude, latitude]
    };
    lastUpdateTime: string;
    openingHours?: Date;
    isOpening?: boolean;
    features?: {
        women: threeCases;
        men: threeCases;
        accessible: threeCases;
        genderNeutral: threeCases;
        children: threeCases;
        free: threeCases;
        fee?: number;
    };
    isRemoved: boolean;
    votesCount?: number;
    isFromUser: boolean;
    keyword?: string;
    users?: string[];
    removeMsg?: string;
}
ToiletsSchema.index({ 'location': '2dsphere' });
const Toilet = models?.Toilet || model<IToilet>('Toilet', ToiletsSchema);
export default Toilet;

