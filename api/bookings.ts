import {app, connectDB} from '../src/booking-service/index.js'
import { VercelRequest, VercelResponse } from '@vercel/node';

const handeler = async (req: VercelRequest, res: VercelResponse) => {
    await connectDB();
    await app(req,res);
}

export default handeler;