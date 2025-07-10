import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Restaurants } from './entities/restaurant.entity';
import { User } from '../users/entities/user.entity';
import { Menus } from '../menus/entities/menu.entity';
import { Op } from 'sequelize';

@Injectable()
export class RestaurantsService {
  constructor(@InjectModel(Restaurants) private resModel: typeof Restaurants){}
    async create(createRestaurantDto: CreateRestaurantDto) {
      return await this.resModel.create(createRestaurantDto);
    }
    
  
    async findAll(name?: string, address?: string) {
      const where: any = {};
    
      if (name) {
        where.name = { [Op.iLike]: `%${name}%` };
      }
  
    
      if (address) {
        where.address = { [Op.iLike]: `%${address}%` };
      }
    
      return await this.resModel.findAll({
        where,
        include: [
          {
            model: Menus,
            attributes: ['id', 'name', 'description', 'price']
          },
        ],
        order: [['createdAt', 'DESC']],
      });
    }
    
    
  
    async findOne(id: number) {
      return await this.resModel.findByPk(id);
    }
  
    async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
      return await this.resModel.update(updateRestaurantDto, {
        where: {id}, returning: true
      });
    }
  
    async remove(id: number) {
      const deleted = await this.resModel.destroy({where: {id}});
      if(!deleted){
        throw new NotFoundException(`Restaurents ${id} not found`);
      }
      return {message: "Deleted succefuly"};
}
}
