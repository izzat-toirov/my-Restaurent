import { Module } from '@nestjs/common';
import { ManagerCategoryService } from './manager-category.service';
import { ManagerCategoryController } from './manager-category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ManagerCategory } from './entities/manager-category.entity';
import { User } from '../users/entities/user.entity';
import { Restaurants } from '../restaurants/entities/restaurant.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[SequelizeModule.forFeature([ManagerCategory, User, Restaurants]), JwtModule],
  controllers: [ManagerCategoryController],
  providers: [ManagerCategoryService],
  exports: [ManagerCategoryService],
})
export class ManagerCategoryModule {}
