import { IsNotEmpty } from 'class-validator';

export class CreateRedisDto {
  /**
   * redis key
   */
  @IsNotEmpty()
  key: string;

  /**
   * redis type
   */
  @IsNotEmpty()
  type: string;

  /**
   * redis value
   */
  @IsNotEmpty()
  value: any;
}
