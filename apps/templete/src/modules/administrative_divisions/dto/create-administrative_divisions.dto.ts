import { PickType } from '@nestjs/swagger';
import { AdministrativeDivisions } from '../entities/administrative_divisions.entity';

export class CreateAdministrativeDivisionsDto extends PickType(AdministrativeDivisions, ['code', 'name', 'parent']) {}
