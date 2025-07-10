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
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtGuard } from '../common/guards/user.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';


// ✅ Har bir endpointga mos guard va role qo‘shilgan
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Roles('SUPER_ADMIN', 'ADMIN')
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Roles('SUPER_ADMIN','ADMIN', 'MANAGER', 'CUSTOMER')
  @ApiQuery({ name: 'name', required: false, description: 'Restoran nomi bo‘yicha qidiruv' })
  @ApiQuery({ name: 'address', required: false, description: 'Manzil bo‘yicha qidiruv' })
  @Get()
  findAll(@Query('name') name?: string, @Query('address') address?: string) {
    return this.restaurantsService.findAll(name, address);
  }

  @Roles('SUPER_ADMIN','ADMIN', 'MANAGER', 'CUSTOMER')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Roles('SUPER_ADMIN','ADMIN', 'MANAGER')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Roles('SUPER_ADMIN','ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
