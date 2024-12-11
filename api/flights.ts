import { app, connecDB } from "../src/flight-service/index.js";
import { VercelRequest, VercelResponse } from "@vercel/node";

const handeler = async (req: VercelRequest, res: VercelResponse) => {
    console.log("request is here");
    await connecDB();
    await app(req, res)
}

export default handeler;