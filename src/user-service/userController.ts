import { Request,Response } from "express";
import User from "../modals/userModel.js";
import { queryParser } from "../utils/index.js";

const get = async (req: Request,res: Response) => {
    const filter = queryParser(req.query, ['name', 'email'])
    const users = await User.find(filter);
    res.send(users);
};

const getByID =  async (req: Request, res: Response) => {
    try{
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404).send({ message: 'User not found' });
        return;
    }
    res.status(200).send(user); // Respond with the found user
    } catch(error) {
        res.status(500).send(error)
    }
}

const create = async (req: Request,res: Response) => {
    try{
    const {name, email} = req.body;
    const user  = new User({
        name,
        email
    });
    await user.save()
    res.status(201).send(user);
    } catch(error) {
        res.status(500).send(error)
    }
}

const update =  async (req: Request,res: Response) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(userId, {name, email}, {new: true});
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user); // Respond with the updated user
}

const remove =  async (req: Request,res: Response) => {
    try{
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(204).send(); // Respond with no content
    }catch(error) {
        res.status(500).send(error);
    }
}




export default {get, getByID, create, update, remove};