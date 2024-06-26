import { Request, Response } from 'express';
import { v4 as uuidv4, validate } from 'uuid';
import { REQUEST_ID_TOKEN_HEADER } from '../utils';
import { RequestContext } from '../model/request-context.model';

export const RequestIdMiddleware = (req: Request, res: Response, next: () => void): void => {
  /** set request id, if not being set yet */
  if (!req.headers[REQUEST_ID_TOKEN_HEADER] || !validate(req.header(REQUEST_ID_TOKEN_HEADER))) {
    req.headers[REQUEST_ID_TOKEN_HEADER] = uuidv4();
  }

  /** set res id in response from req */
  res.set(REQUEST_ID_TOKEN_HEADER, req.headers[REQUEST_ID_TOKEN_HEADER]);
  RequestContext.cls.run(new RequestContext(req, res), next);
};
