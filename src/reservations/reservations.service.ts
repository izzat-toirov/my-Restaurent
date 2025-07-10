import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { User } from '../users/entities/user.entity';
import { Tables } from '../tables/entities/table.entity';
import { Op } from 'sequelize';

@Injectable()
export class ReservationsService {
  constructor(@InjectModel(Reservation) private reserModel: typeof Reservation,
          @InjectModel(User) private userModel: typeof User,
          @InjectModel(Tables) private tablesModel: typeof Tables
        ){}
            async create(createReservationDto: CreateReservationDto) {
              const restaurent = await this.userModel.findByPk(createReservationDto.user_id);
        
              if (!restaurent) {
                  throw new BadRequestException(`User ID ${createReservationDto.user_id} topilmadi`);
              }
              const tables = await this.tablesModel.findByPk(createReservationDto.table_id);
        
              if (!tables) {
                  throw new BadRequestException(`Tables ID ${createReservationDto.table_id} topilmadi`);
              }
              return await this.reserModel.create(createReservationDto);
            }
            
          
            async findAll(filters: {
              status?: string;
              reservation_date?: string;
              user_id?: string;
              table_id?: string;
              from?: string;
              to?: string;
              limit?: string;
              offset?: string;
            }) {
              const where: any = {};
            
              if (filters.status !== undefined) {
                where.status = filters.status === 'true';
              }
            
              if (filters.reservation_date) {
                where.reservation_date = filters.reservation_date;
              }
            
              if (filters.user_id) {
                where.user_id = parseInt(filters.user_id);
              }
            
              if (filters.table_id) {
                where.table_id = parseInt(filters.table_id);
              }
            
              if (filters.from && filters.to) {
                where.reservation_date = {
                  [Op.between]: [filters.from, filters.to],
                };
              }
            
              const limit = filters.limit ? parseInt(filters.limit) : 10;
              const offset = filters.offset ? parseInt(filters.offset) : 0;
            
              const { count, rows } = await this.reserModel.findAndCountAll({
                where,
                include: [
                  {
                    model: User,
                    attributes: ['id', 'name', 'phone'],
                  },
                  {
                    model: Tables,
                    attributes: ['id', 'table_number', 'capacity'],
                  },
                ],
                limit,
                offset,
              });
            
              return {
                total: count,
                limit,
                offset,
                data: rows,
              }
            }
            
            
          
            async findOne(id: number) {
              return await this.reserModel.findByPk(id);
            }
          
            // async update(id: number, updateReservationDto: UpdateReservationDto) {
            //   return await this.reserModel.update(updateReservationDto, {
            //     where: {id}, returning: true
            //   });
            // }
          
            async remove(id: number) {
              const deleted = await this.reserModel.destroy({where: {id}});
              if(!deleted){
                throw new NotFoundException(`Reservation ${id} not found`);
              }
              return {message: "Deleted succefuly"};
        }
}
