import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MenuCategory } from './entities/menu-category.entity';

@Injectable()
export class MenuCategoryService {
  constructor(@InjectModel(MenuCategory) private menuCategoryModel: typeof MenuCategory){}

        async create(createMenuCategoryDto: CreateMenuCategoryDto) {
          return await this.menuCategoryModel.create(createMenuCategoryDto);
        }
        
      
        async findAll() {
          return await this.menuCategoryModel.findAll({include: {all: true}});
        }
        
      
        async findOne(id: number) {
          return await this.menuCategoryModel.findByPk(id);
        }
      
        async update(id: number, updateMenuCategoryDto: UpdateMenuCategoryDto) {
          return await this.menuCategoryModel.update(updateMenuCategoryDto, {
            where: {id}, returning: true
          });
        }
      
        async remove(id: number) {
          const deleted = await this.menuCategoryModel.destroy({where: {id}});
          if(!deleted){
            throw new NotFoundException(`menuCategory id ${id} not found`);
          }
          return {message: "Deleted succefuly"};
    }
}
