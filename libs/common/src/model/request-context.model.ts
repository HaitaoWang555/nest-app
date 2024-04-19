import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response } from 'express';
import { REQUEST_ID_TOKEN_HEADER } from '../utils';

export class RequestContext {
  static cls = new AsyncLocalStorage<RequestContext>();

  static get currentContext() {
    return this.cls.getStore();
  }

  constructor(
    public readonly req: Request,
    public readonly res: Response,
  ) {}

  getRequestId() {
    return this.req.headers[REQUEST_ID_TOKEN_HEADER];
  }
}
