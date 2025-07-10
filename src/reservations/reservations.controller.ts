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
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtGuard } from '../common/guards/user.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Roles('CUSTOMER', 'ADMIN', 'SUPER_ADMIN')
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @ApiQuery({ name: 'status', required: false,})
    @ApiQuery({ name: 'reservation_date', required: false })
    @ApiQuery({ name: 'user_id', required: false})
      @ApiQuery({ name: 'table_id', required: false })
      @ApiQuery({ name: 'from', required: false })
        @ApiQuery({ name: 'to', required: false })
        @ApiQuery({ name: 'limit', required: false })
        @ApiQuery({ name: 'offset', required: false })
  @Roles('ADMIN', 'SUPER_ADMIN',)
  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('reservation_date') reservation_date?: string,
    @Query('user_id') user_id?: string,
    @Query('table_id') table_id?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.reservationsService.findAll({
      status,
      reservation_date,
      user_id,
      table_id,
      from,
      to,
      limit,
      offset,
    });
  }

  @Roles('CUSTOMER', 'ADMIN', 'SUPER_ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  // Agar update kerak bo‘lsa, shu qatorni faollashtiring:
  // @Roles('ADMIN', 'SUPER_ADMIN')
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
  //   return this.reservationsService.update(+id, updateReservationDto);
  // }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
