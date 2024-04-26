export class VersionDto {
  buildDate: string;
  cpus?: CpuInfo[];
  nodeVersion: string;
  timeZone: string;
  systemVersion: string;
  totalMemory?: number;
  freeMemory?: number;
  runTime: number;
  disks?: TDrive[];
}
export class CpuInfo {
  model: string;
  speed: number;
  times: {
    user: number;
    nice: number;
    sys: number;
    idle: number;
    irq: number;
  };
}
export class TDrive {
  /**
   * Drive filesystem.
   */
  private _filesystem: string;
  /**
   * Blocks associated to disk.
   */
  private _blocks: number;
  /**
   * Used disk space.
   */
  private _used: number;
  /**
   * Available disk space.
   */
  private _available: number;
  /**
   * Disk capacity.
   */
  private _capacity: string;
  /**
   * Indicates the mount point of the disk.
   */
  private _mounted: string;
}
