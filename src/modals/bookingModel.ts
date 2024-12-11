import mongoose, { Schema, model, Document } from "mongoose";

interface IBooking extends Document {
    user: string,
    flight: string,
    bookingDate: Date,
    status: String
}

const bookingSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User',
        required: true
    },
    flight: {
        type: mongoose.Schema.ObjectId,
        ref: 'Flight',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'confirmed', 'cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = model<IBooking>('Booking', bookingSchema);
export default Booking;