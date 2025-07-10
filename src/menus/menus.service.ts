import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Restaurants } from '../restaurants/entities/restaurant.entity';
import { Menus } from './entities/menu.entity';
import { MenuCategory } from '../menu-category/entities/menu-category.entity';
import { Op } from 'sequelize';

@Injectable()
export class MenusService {
  constructor(@InjectModel(Restaurants) private resModel: typeof Restaurants,
    @InjectModel(Menus) private menuModel: typeof Menus,
    @InjectModel(MenuCategory) private menuCategoryModel: typeof MenuCategory
  ){}
      async create(createMenuDto: CreateMenuDto) {
        const restaurent = await this.resModel.findByPk(createMenuDto.restaurant_id);
  
        if (!restaurent) {
            throw new BadRequestException(`Restaurent ID ${createMenuDto.restaurant_id} topilmadi`);
        }

        const menuCategory = await this.menuCategoryModel.findByPk(createMenuDto.category_id);
  
        if (!menuCategory) {
            throw new BadRequestException(`menuCategory ID ${createMenuDto.category_id} topilmadi`);
        }
        return await this.menuModel.create(createMenuDto);
      }
      
    
      async findAll(filters: {
        restaurant_id?: string;
        category_id?: string;
        limit?: string;
        offset?: string;
      }) {
        const where: any = {};
      
        if (filters.restaurant_id) {
          where.restaurant_id = parseInt(filters.restaurant_id);
        }
      
        if (filters.category_id) {
          where.category_id = parseInt(filters.category_id);
        }
      
      
        const limit = filters.limit ? parseInt(filters.limit) : 10;
        const offset = filters.offset ? parseInt(filters.offset) : 0;
      
        const { count, rows } = await this.menuModel.findAndCountAll({
          where,
          include: [
            {
              model: Restaurants,
              attributes: ['id', 'name', 'description', 'phone_number', 'address'],
            },
            {
              model: MenuCategory,
              attributes: ['id', 'name', 'description'],
            },
          ],
          limit,
          offset,
          order: [['name', 'ASC']], // optional: nomi bo‘yicha tartib
        });
      
        return {
          total: count,
          limit,
          offset,
          data: rows,
        };
      }
      
    
      async findOne(id: number) {
        return await this.menuModel.findByPk(id);
      }
    
      async update(id: number, updateMenuDto: UpdateMenuDto) {
        return await this.menuModel.update(updateMenuDto, {
          where: {id}, returning: true
        });
      }
    
      async remove(id: number) {
        const deleted = await this.menuModel.destroy({where: {id}});
        if(!deleted){
          throw new NotFoundException(`Restaurents ${id} not found`);
        }
        return {message: "Deleted succefuly"};
  }
}
