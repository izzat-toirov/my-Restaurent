import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tables } from './entities/table.entity';
import { Restaurants } from '../restaurants/entities/restaurant.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Tables, Restaurants]), JwtModule],
  controllers: [TablesController],
  providers: [TablesService],
  exports: [TablesService]
})
export class TablesModule {}
