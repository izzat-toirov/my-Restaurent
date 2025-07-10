import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ManagerCategoryService } from './manager-category.service';
import { CreateManagerCategoryDto } from './dto/create-manager-category.dto';
import { UpdateManagerCategoryDto } from './dto/update-manager-category.dto';
import { JwtGuard } from '../common/guards/user.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('manager-category')
export class ManagerCategoryController {
  constructor(private readonly managerCategoryService: ManagerCategoryService) {}

  @Roles('SUPER_ADMIN')
  @Post()
  create(@Body() createManagerCategoryDto: CreateManagerCategoryDto) {
    return this.managerCategoryService.create(createManagerCategoryDto);
  }

  @Roles('SUPER_ADMIN')
  @Get()
  findAll() {
    return this.managerCategoryService.findAll();
  }

  @Roles('SUPER_ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerCategoryService.findOne(+id);
  }

  @Roles('SUPER_ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerCategoryDto: UpdateManagerCategoryDto) {
    return this.managerCategoryService.update(+id, updateManagerCategoryDto);
  }

  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerCategoryService.remove(+id);
  }
}
