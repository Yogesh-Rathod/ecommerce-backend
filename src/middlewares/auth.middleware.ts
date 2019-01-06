import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import DataInToken from '../interfaces/dataInToken';
import JWTMissingException from '../exceptions/JWTMissingException';
import WrongJWTException from '../exceptions/WrongJWTException';
import query from '../utils/database';

async function authMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const headers: any = request.headers;
    if (headers && headers.authorization) {
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jwt.verify(
                headers.authorization,
                secret
            ) as DataInToken;
            const queryString = `SELECT * from users WHERE id=$1 FETCH FIRST ROW ONLY`,
                values = [verificationResponse.id];
            const { rows } = await query(queryString, values);
            if (rows && rows.length) {
                request['user'] = rows[0];
                next();
            } else {
                next(new WrongJWTException());
            }
        } catch (error) {
            next(new WrongJWTException());
        }
    } else {
        next(new JWTMissingException());
    }
}

export default authMiddleware;
