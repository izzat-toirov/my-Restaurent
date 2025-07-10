import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuImageDto } from './dto/create-menu_image.dto';
import { UpdateMenuImageDto } from './dto/update-menu_image.dto';
import { MenuImage } from './entities/menu_image.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Menus } from '../menus/entities/menu.entity';

@Injectable()
export class MenuImagesService {
   constructor(@InjectModel(MenuImage) private imageModel: typeof MenuImage,
     @InjectModel(Menus) private menusModel: typeof Menus){}
       async create(createMenuImageDto: CreateMenuImageDto, image?: string) {
         const manager = await this.menusModel.findByPk(createMenuImageDto.menu_id);
   
         if (!manager) {
             throw new BadRequestException(`MenuImag ID ${createMenuImageDto.menu_id} topilmadi`);
         }
         return this.imageModel.create({
          menu_id: createMenuImageDto.menu_id,
          image: createMenuImageDto.image,
        })
       }
       
     
       async findAll(filters: {menu_id?: string;}) {
        const where: any = {};
      
        if (filters.menu_id) {
          where.menu_id = parseInt(filters.menu_id);
        }
         return await this.imageModel.findAll({ where,include: [
          {
              model: Menus,
              attributes: ['id', 'name', 'description', 'price']
          },
         ]});
       }
       
     
       async findOne(id: number) {
         return await this.imageModel.findByPk(id);
       }
     
       async update(id: number, updateMenuImageDto: UpdateMenuImageDto) {
         return await this.imageModel.update(updateMenuImageDto, {
           where: {id}, returning: true
         });
       }
     
       async remove(id: number) {
         const deleted = await this.imageModel.destroy({where: {id}});
         if(!deleted){
           throw new NotFoundException(`MenuImag ${id} not found`);
         }
         return {message: "Deleted succefuly"};
   }
}
