import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import User from '../modals/userModel.js';
import jwt from 'jsonwebtoken';
import { IUser } from '../modals/userModel.js';
// import CryptoJS from 'crypto-js';

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
// const FRONTEND_SECRET = process.env.FRONTEND_SECRET;

const generateAccessToken = ({user, JWT_SECRET}: {
    user: IUser,
    JWT_SECRET: string,
}) => {
    const token = jwt.sign({id: user._id},JWT_SECRET,{expiresIn: '1h'})
    return token;
}

const generateRefreshToken = ({user, JWT_REFRESH_SECRET}:{
    user: IUser,
    JWT_REFRESH_SECRET: string
}) => {
    const refreshToken = jwt.sign({id: user._id}, JWT_REFRESH_SECRET, {expiresIn: '7d'})
    return refreshToken;
}


const signup = async (req: Request, res: Response) => {
    console.log('request recived');
    const {name, email, password} = req.body;
    //If the password comes already encrypted from frntend
    // if(!FRONTEND_SECRET) {
    //     return res.status(500).send('Secret key missing');
    // }
    // const bytes = CryptoJS.AES.decrypt(password, FRONTEND_SECRET);
    // const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)
    // console.log('decrypted password', decryptedPassword);
    try {
        const hashedPAssword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, 
            email,
            password: hashedPAssword
        });
        await newUser.save();
        res.status(201).send({
            message: "User created",
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

const signin = async (req: Request,res: Response) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({
            email,
        });
        if(!user) {
            return res.status(404).send('User Not Found!');
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).send('Password in wrong');
        }
        if(!JWT_SECRET) {
            return res.status(500).send('Secret Not Found');
        }
        const token = generateAccessToken({user, JWT_SECRET});
        if(!JWT_REFRESH_SECRET) {
            return res.status(500).send('Refresh secret Not Found');
        }
        const refreshToken = generateRefreshToken({user, JWT_REFRESH_SECRET});

        user.refreshToken = refreshToken;
        await user.save();
        res.status(200).send({
            token,
            refreshToken
        });

    } catch (error) {
        res.status(500).send(error)
    }
}

const handelRefreshTokenGeneration = async (req: Request, res:Response) => {

const refreshToken: string = req.body.refreshToken;
if(!refreshToken) {
    return res.status(401).send("refreshtoken required");
}
try {
    const user = await User.findOne({
        refreshToken
    });
    console.log(user);
    if(!user) {
        return res.status(403).send("Invalid Refresh Token");
    }
    if(!JWT_REFRESH_SECRET) {
        return res.status(500).send('Refresh secret Not Found');
    }
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decode) => {
        if(err) {
            return res.status(403).send("Invalid Refresh Token");
        }
        if(!JWT_SECRET) {
            return res.status(500).send('Secret Not Found');
        }
        const token = generateAccessToken({user, JWT_SECRET});
        res.status(200).send({token});
    })
    } catch(error) {
        res.status(500).send("Server Error");
    }
}

export default {
    signup,
    signin,
    handelRefreshTokenGeneration
}