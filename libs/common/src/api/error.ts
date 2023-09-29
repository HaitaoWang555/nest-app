import { ResultCode, ResultMessage } from './result-enum';

export class ApiException extends Error {
  code: number;
  message: string;

  constructor(message?: string, code?: number) {
    super();
    this.code = code || ResultCode.FAILED;
    this.message = message || ResultMessage.FAILED;
  }
}
