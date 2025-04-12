import { JwtPayload, Secret, SignOptions, sign, verify, TokenExpiredError } from 'jsonwebtoken';

export default class JWT {
  static secret: Secret = 'secret';


  static sign(user): string {
    const payload = { id: user.id, email: user.email, role: user.role }
    return sign(payload, 'secret', { expiresIn: '1h' });
  }
  
}
