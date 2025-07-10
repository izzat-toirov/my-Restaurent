import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Menus } from './entities/menu.entity';
import { Restaurants } from '../restaurants/entities/restaurant.entity';
import { MenuCategory } from '../menu-category/entities/menu-category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Menus, Restaurants, MenuCategory]), JwtModule],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
