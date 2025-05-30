import { NextApiRequest } from "next";
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthResult{
    user?:string | JwtPayload;
    error?:string;
}

export function authenticate(
    req: NextApiRequest,
    // res: NextApiResponse
): AuthResult{
 const authHeader = req.headers.authorization;
 if (!authHeader){
    return { error: 'No token provided'};
 }
 const token = authHeader.split(' ')[1];
 try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return {user: decoded};
 }catch {
    return { error: 'Invalid token'};
 }
}