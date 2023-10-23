import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { CommonResult, ResultCode } from '@libs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : ResultCode.FAILED;
    if (status === HttpStatus.NOT_FOUND) {
      this.logger.error(exception.toString());
    } else {
      this.logger.error(exception.toString(), exception.stack);
    }
    this.logger.error('path: ' + httpAdapter.getRequestUrl(request));
    this.logger.error('method: ' + httpAdapter.getRequestMethod(request));

    httpAdapter.reply(ctx.getResponse(), new CommonResult().fail(exception.toString(), status), HttpStatus.OK);
  }
}
