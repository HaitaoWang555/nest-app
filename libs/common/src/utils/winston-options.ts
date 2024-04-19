import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';
import * as chalk from 'chalk';
import { sep } from 'path';
import { WinstonModuleOptions } from 'nest-winston';

export function getWinstonOptions(config: ConfigService): WinstonModuleOptions {
  const appName = config.get('APP_NAME') || 'NestApp';
  const dirname = 'logs' + sep + appName;

  function beautifulString(rest: Record<string, any>) {
    let restStr = '';
    if (Object.keys(rest).length > 0) {
      for (const key in rest) {
        if (typeof rest[key] === 'object' && !(rest[key] instanceof Array)) {
          restStr = restStr + ' ' + JSON.stringify(rest[key]);
        } else {
          restStr = restStr + ' ' + rest[key];
        }
      }
    }
    return restStr;
  }

  function formatLog(log: Record<string, any>) {
    const { timestamp, level, context = '', message, ...rest } = log;
    const baseLine = `${chalk.green('[' + appName + ']')} ${chalk.green(process.pid)} - ${timestamp} ${level} ${chalk.yellow('[' + context + ']')} - ${chalk.green(message)}`;

    return `${baseLine} - ${chalk.yellow(beautifulString(rest))}`;
  }

  function formatLogProd(log: Record<string, any>) {
    const { timestamp, level, context = '', message, ...rest } = log;
    const baseLine = `[${appName}] ${process.pid} - ${timestamp} ${level} [${context}] - ${message}`;

    return `${baseLine} - ${beautifulString(rest)}`;
  }

  const transports: winston.transport[] = [];

  if (process.env.NODE_ENV === 'dev') {
    transports.push(
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          winston.format.combine(),
          winston.format.ms(),
          winston.format.printf(formatLog),
        ),
      }),
    );
  }

  if (process.env.NODE_ENV === 'production') {
    const format = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.ms(),
      winston.format.printf(formatLogProd),
    );

    transports.push(
      new winston.transports.DailyRotateFile({
        format,
        level: 'error',
        dirname,
        filename: 'error-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '2m',
        // maxFiles: '365d',
      }),
    );
    transports.push(
      new winston.transports.DailyRotateFile({
        level: 'info',
        format,
        dirname,
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '2m',
        // maxFiles: '365d',
      }),
    );
  }

  return {
    transports,
    exceptionHandlers: [new winston.transports.File({ dirname, filename: 'exceptions.log' })],
    rejectionHandlers: [new winston.transports.File({ dirname, filename: 'rejections.log' })],
  };
}
