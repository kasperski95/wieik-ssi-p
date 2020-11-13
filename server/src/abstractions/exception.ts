import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Exception {
  constructor(public message: string, public statusCode: StatusCodes) {}
}
