import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';
import { User } from '../users/entities/user.entity';
import { Restaurants } from '../restaurants/entities/restaurant.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewsModel: typeof Review,
            @InjectModel(User) private userModel: typeof User,
            @InjectModel(Restaurants) private restaurantsModel: typeof Restaurants
          ){}
              async create(createReviewDto: CreateReviewDto) {
                const users = await this.userModel.findByPk(createReviewDto.user_id);
          
                if (!users) {
                    throw new BadRequestException(`User ID ${createReviewDto.user_id} topilmadi`);
                }
                const restaurent = await this.restaurantsModel.findByPk(createReviewDto.restaurant_id);
          
                if (!restaurent) {
                    throw new BadRequestException(`Restaurent ID ${createReviewDto.restaurant_id} topilmadi`);
                }
                return await this.reviewsModel.create(createReviewDto);
              }
              
            
              async findAll() {
                return await this.reviewsModel.findAll({
                  include: [
                    {
                      model: User,
                    },
                    {
                      model: Restaurants,
                    }
                  ],
                });
              }
              
            
              async findOne(id: number) {
                return await this.reviewsModel.findByPk(id);
              }
            
              async update(id: number, updateReviewDto: UpdateReviewDto) {
                return await this.reviewsModel.update(updateReviewDto, {
                  where: {id}, returning: true
                });
              }
            
              async remove(id: number) {
                const deleted = await this.reviewsModel.destroy({where: {id}});
                if(!deleted){
                  throw new NotFoundException(`Reservation ${id} not found`);
                }
                return {message: "Deleted succefuly"};
          }
}
