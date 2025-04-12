import { Request, Response } from 'express';
import JWT from '../utils/JWT';
import { ServiceResponse } from '../interface/services-response';
import { verify } from 'jsonwebtoken';

export default class ValidationsToken {
    static validateToken(req: Request, res: Response): ServiceResponse<{ message: string }> | any {
        // Agora o token é capturado diretamente, sem a necessidade de remover "Bearer"
        const token = req.headers.authorization;
        console.log('token', token);  // Verifique o que está sendo recebido no cabeçalho de autorização
        const errorMessage = 'Token must be a valid token';
      
        if (!token) {
          return { status: 'unauthorized', data: { message: errorMessage } };
        }
      
        try {
          const tokenDecoded = verify(token, 'secret') as any;
          
          req.body.user = tokenDecoded;
          return tokenDecoded;
        } catch (error: any) {
          console.error('Erro na verificação do token:', error.message);
          return { status: 'unauthorized', data: { message: errorMessage } };
        }
      }
}
