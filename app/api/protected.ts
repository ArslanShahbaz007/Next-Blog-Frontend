import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../lib/auth";

interface CustomJwtPayload {
    userId: number;
    role: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {user, error} = authenticate(req);
    if(error|| !user || typeof user === 'string'){
        return res.status(401).json({error: error || 'Invalid token format'});
    }
    const {userId, role} = user as CustomJwtPayload;
    return res.status(200).json({message:`Welcome, user ${userId} with role ${role}`});
}