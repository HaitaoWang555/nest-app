import { Entity, Column, Tree, TreeChildren, TreeParent, PrimaryColumn } from 'typeorm';
import { Allow, IsNotEmpty } from 'class-validator';

/**
 * 行政区划
 */
@Entity()
@Tree('closure-table')
export class AdministrativeDivisions {
  /**
   * 行政编码
   */
  @PrimaryColumn({ comment: '行政编码', length: 16 })
  @IsNotEmpty()
  code: string;

  /**
   * 名称
   */
  @Column({ comment: '名称', length: 64 })
  @IsNotEmpty()
  name: string;

  /**
   * 子级
   */
  @TreeChildren()
  @Allow()
  children: AdministrativeDivisions[];

  /**
   * 父级
   */
  @TreeParent()
  @Allow()
  parent: AdministrativeDivisions;
}
