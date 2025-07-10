import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { User } from '../users/entities/user.entity';
import { Tables } from '../tables/entities/table.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Reservation, User, Tables]), JwtModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
