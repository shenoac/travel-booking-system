import { VercelRequest, VercelResponse } from "@vercel/node";
import { app, connectDB } from "../src/user-service/index.js";

const handeler = async (req: VercelRequest, res: VercelResponse) => {
    // res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify specific domain)
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    await connectDB(); 
    await app(req, res);
}

export default handeler;