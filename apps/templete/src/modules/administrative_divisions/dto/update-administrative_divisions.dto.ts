import { PartialType } from '@nestjs/swagger';
import { CreateAdministrativeDivisionsDto } from './create-administrative_divisions.dto';

export class UpdateAdministrativeDivisionsDto extends PartialType(CreateAdministrativeDivisionsDto) {}
