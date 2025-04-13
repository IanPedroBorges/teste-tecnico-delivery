import { Request, Response } from 'express';
import JWT from '../utils/JWT';
import { ServiceResponse } from '../interface/services-response';
import { verify } from 'jsonwebtoken';

export default class ValidationsToken {
    static validateToken(req: Request, res: Response): ServiceResponse<{ message: string }> | any {
        const token = req.headers.authorization;
        console.log('token', token); 
        const errorMessage = 'Token must be a valid token';
      
        if (!token) {
          return { status: 'unauthorized', data: { message: errorMessage } };
        }
      
        try {
          const tokenDecoded = verify(token, 'secret');
          
          req.body.user = tokenDecoded;
          return tokenDecoded;
        } catch (error: any) {
          console.error('Erro na verificação do token:', error.message);
          return { status: 'unauthorized', data: { message: errorMessage } };
        }
      }
}
