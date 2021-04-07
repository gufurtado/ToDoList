import { NextFunction, Request, Response } from "express";
import authConfig from '../config/auth'
import { verify } from 'jsonwebtoken'

interface TokenPayload{
    iat: string;
    exp: string;
    sub: string;
}


export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new Error('JWT is missing!')
    }

    const [ , token] = authHeader.split(' ')

    try {
        const decoded = verify(token,authConfig.jwt.secret)

        const { sub } = decoded as TokenPayload

        request.user = {
            id: sub
        }

        return next()

    } catch (error) {
        throw new Error('Invalid JWT Token!')
    }
}