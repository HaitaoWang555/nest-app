import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenTableService } from './gen_table.service';
import { GenTableController } from './gen_table.controller';
import { GenTable } from './entities/gen_table.entity';
import { GenTableColumn } from './entities/gen_table_column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenTable, GenTableColumn])],
  controllers: [GenTableController],
  providers: [GenTableService],
})
export class GenTableModule {}
