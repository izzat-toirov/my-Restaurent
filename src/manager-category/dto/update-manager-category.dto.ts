import { PartialType } from '@nestjs/swagger';
import { CreateManagerCategoryDto } from './create-manager-category.dto';

export class UpdateManagerCategoryDto extends PartialType(CreateManagerCategoryDto) {}
