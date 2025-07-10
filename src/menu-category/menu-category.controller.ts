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
import { MenuCategoryService } from './menu-category.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';

import { JwtGuard } from '../common/guards/user.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@ApiBearerAuth()
@Controller('menu-category')
@UseGuards(JwtGuard)
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Roles('SUPER_ADMIN','ADMIN')
  @Post()
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @Get()
  findAll() {
    return this.menuCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuCategoryService.findOne(+id);
  }

  @Roles('SUPER_ADMIN','ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    return this.menuCategoryService.update(+id, updateMenuCategoryDto);
  }

  @Roles('SUPER_ADMIN','ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuCategoryService.remove(+id);
  }
}
