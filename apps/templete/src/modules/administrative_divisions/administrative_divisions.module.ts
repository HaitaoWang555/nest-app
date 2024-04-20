import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativeDivisionsService } from './administrative_divisions.service';
import { AdministrativeDivisionsController } from './administrative_divisions.controller';
import { AdministrativeDivisions } from './entities/administrative_divisions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdministrativeDivisions])],
  controllers: [AdministrativeDivisionsController],
  providers: [AdministrativeDivisionsService],
})
export class AdministrativeDivisionsModule {}
