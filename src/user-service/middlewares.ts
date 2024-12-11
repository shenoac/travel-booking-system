import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
const userValidation  = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().notEmpty().withMessage('Email is reuired')
];

const userVallidationHandler = (req: Request, res:Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors);
    }
    next();
};

const auth = (req: Request, res: Response, next: NextFunction) => {
    //bearer token
    const token = req.headers['authorization']?.split(' ')[1];
    try {
    if(!token) {
        return res.status(401).send('Token not provided');
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET) {
        return res.status(500).send('Secret Not Found');
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        console.log('err', err)
        if(err) {
            return res.status(401).send('Unauthorized'); 
        }
        // req.userId = (decoded as any).id; //attach user id to request 
        next();
    })
    }catch (error) {
        res.status(500).send(error)
    }

}

export default {userValidation, userVallidationHandler, auth};