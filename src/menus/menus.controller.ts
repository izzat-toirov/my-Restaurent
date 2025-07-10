import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/user.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiBearerAuth()
@Controller('menus')
@UseGuards(JwtGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER')
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @ApiQuery({ name: 'restaurant_id', required: false })
  @ApiQuery({ name: 'category_id', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @Get()
  findAll(
    @Query('restaurant_id') restaurant_id?: string,
    @Query('category_id') category_id?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.menusService.findAll({
      restaurant_id,
      category_id,
      limit,
      offset,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
