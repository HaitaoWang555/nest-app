import { Controller, Get } from '@nestjs/common';
import * as os from 'os';
import { BUILD_DATE } from '../utils';
import { getDiskInfo } from 'node-disk-info';
import type Drive from 'node-disk-info/dist/classes/drive';
const startTime = process.hrtime();
export type TVersion = {
  buildDate: string;
  cpus: os.CpuInfo[];
  nodeVersion: string;
  systemVersion: string;
  totalMemory: number;
  freeMemory: number;
  runTime: number;
  disks: Drive[];
};

@Controller('version')
export class VersionController {
  @Get()
  async getVersion() {
    const disks = await getDiskInfo();
    const endTime = process.hrtime(startTime);

    const version: TVersion = {
      buildDate: BUILD_DATE,
      nodeVersion: process.version,
      systemVersion: os.version(),
      cpus: os.cpus(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      runTime: endTime[0],
      disks: disks,
    };
    return version;
  }
}
