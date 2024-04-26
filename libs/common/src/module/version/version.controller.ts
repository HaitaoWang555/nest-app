import { Controller, Get } from '@nestjs/common';
import * as os from 'os';
import { BUILD_DATE } from '../../utils';
import { getDiskInfo } from 'node-disk-info';
import { VersionDto, TDrive } from './version.dto';
const startTime = process.hrtime();

@Controller('version')
export class VersionController {
  /**
   * 基础信息
   */
  @Get('/base')
  base() {
    return this.baseInfo();
  }
  /**
   * 基础信息 cpu 内存 磁盘信息
   */
  @Get()
  async getVersion() {
    const disks = (await getDiskInfo()) as unknown as TDrive[];
    const base = this.baseInfo();

    const version: VersionDto = {
      ...base,
      cpus: os.cpus(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      disks: disks,
    };
    return version;
  }

  private baseInfo() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const endTime = process.hrtime(startTime);

    const version: VersionDto = {
      buildDate: BUILD_DATE,
      nodeVersion: process.version,
      systemVersion: os.version(),
      timeZone,
      runTime: endTime[0],
    };

    return version;
  }
}
