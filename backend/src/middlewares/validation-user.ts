import { NextFunction, Request, Response } from 'express';

export default class ValidationsUser {
  static inputsValidations(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;
    if (!email || !password) {
    res.status(400).json({ message: 'All fields must be filled' });
    return;
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email) || password.length < 6) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    return next();
  }
}
