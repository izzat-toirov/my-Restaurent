import { Module } from '@nestjs/common';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryController } from './menu-category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuCategory } from './entities/menu-category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([MenuCategory]), JwtModule],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService],
  exports: [MenuCategoryService],
})
export class MenuCategoryModule {}
