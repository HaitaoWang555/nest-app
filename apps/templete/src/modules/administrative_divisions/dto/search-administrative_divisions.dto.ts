import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { AdministrativeDivisions } from '../entities/administrative_divisions.entity';
import { PageParams } from '@libs/common';

export class SearchAdministrativeDivisionsDtoWithNotPage extends PartialType(
  PickType(AdministrativeDivisions, ['code', 'name']),
) {}

export class SearchAdministrativeDivisionsDto extends IntersectionType(
  PageParams,
  SearchAdministrativeDivisionsDtoWithNotPage,
) {}
