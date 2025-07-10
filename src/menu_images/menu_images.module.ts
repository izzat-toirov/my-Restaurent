import { Module } from '@nestjs/common';
import { MenuImagesService } from './menu_images.service';
import { MenuImagesController } from './menu_images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuImage } from './entities/menu_image.entity';
import { Menus } from '../menus/entities/menu.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([MenuImage, Menus]), JwtModule],
  controllers: [MenuImagesController],
  providers: [MenuImagesService],
  exports: [MenuImagesService],
})
export class MenuImagesModule {}
