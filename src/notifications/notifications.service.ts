import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
   constructor(@InjectModel(Notification) private notiModel: typeof Notification,
        @InjectModel(User) private userModel: typeof User){}
          async create(createNotificationDto: CreateNotificationDto) {
            const restaurent = await this.userModel.findByPk(createNotificationDto.user_id);
      
            if (!restaurent) {
                throw new BadRequestException(`User ID ${createNotificationDto.user_id} topilmadi`);
            }
            return await this.notiModel.create(createNotificationDto);
          }
          
        
          async findAll() {
            return await this.notiModel.findAll({
              include: [
                {
                  model: User,
                },
              ],
            });
          }
          
        
          async findOne(id: number) {
            return await this.notiModel.findByPk(id);
          }
        
          async update(id: number, updateNotificationDto: UpdateNotificationDto) {
            return await this.notiModel.update(updateNotificationDto, {
              where: {id}, returning: true
            });
          }
        
          async remove(id: number) {
            const deleted = await this.notiModel.destroy({where: {id}});
            if(!deleted){
              throw new NotFoundException(`notification ${id} not found`);
            }
            return {message: "Deleted succefuly"};
      }
}
