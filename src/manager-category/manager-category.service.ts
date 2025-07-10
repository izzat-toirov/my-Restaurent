import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerCategoryDto } from './dto/create-manager-category.dto';
import { UpdateManagerCategoryDto } from './dto/update-manager-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ManagerCategory } from './entities/manager-category.entity';
import { User } from '../users/entities/user.entity';
import { Restaurants } from '../restaurants/entities/restaurant.entity';

@Injectable()
export class ManagerCategoryService {
    constructor(@InjectModel(ManagerCategory) private managerCategorysModel: typeof ManagerCategory,
              @InjectModel(User) private userModel: typeof User,
              @InjectModel(Restaurants) private restaurantsModel: typeof Restaurants
            ){}
                async create(createManagerCategoryDto: CreateManagerCategoryDto) {
                  const users = await this.userModel.findByPk(createManagerCategoryDto.user_id);
            
                  if (!users) {
                      throw new BadRequestException(`User ID ${createManagerCategoryDto.user_id} topilmadi`);
                  }
                  const restaurent = await this.restaurantsModel.findByPk(createManagerCategoryDto.restaurent_id);
            
                  if (!restaurent) {
                      throw new BadRequestException(`Restaurent ID ${createManagerCategoryDto.restaurent_id} topilmadi`);
                  }
                  return await this.managerCategorysModel.create(createManagerCategoryDto);
                }
                
              
                async findAll() {
                  return await this.managerCategorysModel.findAll({
                    include: [
                      {
                        model: User,
                      },
                    ],
                  });
                }
                
              
                async findOne(id: number) {
                  return await this.managerCategorysModel.findByPk(id);
                }
              
                async update(id: number, updateManagerCategoryDto: UpdateManagerCategoryDto) {
                  return await this.managerCategorysModel.update(updateManagerCategoryDto, {
                    where: {id}, returning: true
                  });
                }
              
                async remove(id: number) {
                  const deleted = await this.managerCategorysModel.destroy({where: {id}});
                  if(!deleted){
                    throw new NotFoundException(`ManagerCategory id ${id} not found`);
                  }
                  return {message: "Deleted succefuly"};
            }
}
