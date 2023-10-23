import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Allow, IsEnum, IsNotEmpty } from 'class-validator';
import { GenTableColumn } from './gen_table_column.entity';
import { Status } from '@libs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * 代码生成表
 */
@Entity()
export class GenTable {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 表名称
   */
  @IsNotEmpty()
  @Column()
  tableName: string;

  /**
   * 表描述
   */
  @IsNotEmpty()
  @Column()
  tableComment: string;

  /**
   * 生成文件包名
   */
  @Allow()
  @Column({ default: '' })
  package: string;

  /**
   * 是否包含基础字段
   */
  @Allow()
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column({ default: Status.NO, type: 'tinyint' })
  isHaveBase: Status;

  /**
   * 是否树形结构
   */
  @Allow()
  @ApiProperty({ enum: [Status.YES, Status.NO] })
  @Type(() => Number)
  @IsEnum(Status)
  @Column({ default: Status.NO, type: 'tinyint' })
  isTree: Status;

  /**
   * 一对多关联 代码生成表属性
   */
  @OneToMany(() => GenTableColumn, (column) => column.table, { cascade: true })
  @Allow()
  columns?: GenTableColumn[];

  /**
   * 本次要生成的文件
   */
  @Allow()
  templeteFiles?: string[];

  /**
   * 后端代码路径
   */
  @Allow()
  @Column({ default: '' })
  generateBePtah: string;

  /**
   * 前端端代码路径
   */
  @Allow()
  @Column({ default: '' })
  generateFePtah: string;

  /**
   * 0,1,2;都生成,生成前端,生成后端
   */
  @Allow()
  @Column({ default: 0, type: 'tinyint', comment: '0,1,2;都生成,生成前端,生成后端' })
  generateType?: number;
}
