import { Logger } from '@nestjs/common';

export function Timing(customLoggerKey?: string): MethodDecorator {
  const logger = new Logger('Timing');

  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const start = process.hrtime.bigint();
      const result = originalMethod.apply(this, args);
      const className = target.constructor.name;

      const printLog = () => {
        const end = process.hrtime.bigint();
        logger.log(
          `${className} - ${String(customLoggerKey || propertyKey)} 执行时间: ${
            (end - start) / BigInt(1000000)
          } ms; 内存使用: ${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`,
        );
      };

      if (result instanceof Promise) {
        return result.then((data) => {
          printLog();
          return data;
        });
      } else {
        printLog();
        return result;
      }
    };
  };
}
