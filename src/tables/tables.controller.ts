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
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Tables')
@ApiBearerAuth()
@Controller('tables')
// @UseGuards(RolesGuard)
@UseGuards(JwtGuard)
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Roles('SUPER_ADMIN', 'ADMIN')
  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @ApiQuery({ name: 'restaurent_id', required: false, description: 'Restoran ID raqami' })
  @ApiQuery({ name: 'table_number', required: false, description: 'Stol raqami' })
  @ApiQuery({ name: 'capacity', required: false, description: 'Stol sig‘imi (nechta odam sig‘adi)' })
  @Get()
  findAll(
    @Query('restaurent_id') restaurent_id?: string,
    @Query('table_number') table_number?: string,
    @Query('capacity') capacity?: string,
  ) {
    return this.tablesService.findAll({
      restaurent_id,
      table_number,
      capacity,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(+id);
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(+id, updateTableDto);
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(+id);
  }
}
