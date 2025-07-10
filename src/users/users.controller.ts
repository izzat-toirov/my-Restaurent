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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/user.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfOrAdminGuard } from '../common/guards/self.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('super-admin')
  createSuperAdmin() {
    return this.usersService.createSuperAdmin();
  }

  @ApiBearerAuth()
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: ['ADMIN', 'CUSTOMER', 'MANAGER'],
  })
  @ApiBearerAuth()
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtGuard)
  @Get()
  findAll(@Query('name') name: string, @Query('role') role: string) {
    return this.usersService.findAll(name, role);
  }

  @ApiBearerAuth()
  @Roles('SUPER_ADMIN', 'ADMIN', 'CUSTOMER')
  @UseGuards(SelfOrAdminGuard)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles('SUPER_ADMIN', 'ADMIN', 'CUSTOMER')
  @UseGuards(JwtGuard, SelfOrAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiBearerAuth()
  @Get('activate/:link')
  activateUser(@Param('link') link: string) {
    return this.usersService.activateUser(link);
  }
}
