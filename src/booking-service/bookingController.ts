import Booking from "../modals/bookingModel.js";
import { Request, Response } from "express";
import { queryParser } from "../utils/index.js";

const get = async (req: Request, res: Response) => {
    const filter = queryParser(req.query, ['status']);
    const bookings = await Booking.find(filter);
    bookings.filter
    res.status(200).send(bookings);
}

const post = async (req:Request, res: Response) => {
    const {user, flight, status} = req.body;
    const bookingDate = new Date();
    const newBooking = new Booking({user, flight, bookingDate, status});
    await newBooking.save();
    res.status(201).send(newBooking);
}

const getById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const booking = await Booking.findById(id).populate('user flight');
    res.status(200).send(booking);
}

const update = async(req:Request, res:Response) => {
    const {id} = req.params;
    const {user, flight, status} = req.body;
    const booking = await Booking.findById(id);
    if (!booking) {
        return res.status(404).send('Booking Not Found');
    }
    const newBooking = await Booking.findByIdAndUpdate(id, {
        user, flight, status
    }, {
        new: true
    });
    res.status(200).send(newBooking);
}

const remove = async(req: Request, res: Response) => {
    const {id} = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
        return res.status(404).send('Booking Not Found');
    }
    await Booking.findByIdAndDelete(id);
    res.status(204).send();
}

const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const booking = await Booking.findById(id).populate('user');
    if(!booking) {
        return res.status(404).send('Booking Not Found');
    }
    res.status(200).send(booking.user);
}

const getFlight = async (req: Request, res: Response) => {
    const {id} = req.params;
    const booking = await Booking.findById(id).populate('flight');
    if(!booking) {
        return res.status(404).send('Booking Not Found');
    }
    res.status(200).send(booking.flight);
}
export default {get, post, getById, update, remove, getUser, getFlight};