import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export class APIException {
  constructor(public statusCode: StatusCodes, public message?: string) {
    if (!message) {
      this.message = getReasonPhrase(statusCode);
    }
  }
}
