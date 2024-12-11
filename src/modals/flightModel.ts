import mongoose, { Schema, Document } from "mongoose";
export interface IFlight extends Document {
    origin: string;
    destination: string;
    price: number;
}

const flightSchema = new Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        requred: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Flight = mongoose.model<IFlight>('Flight', flightSchema)


export default Flight;
export {flightSchema};