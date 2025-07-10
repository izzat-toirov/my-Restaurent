import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Restaurants } from '../restaurants/entities/restaurant.entity';
import { Tables } from './entities/table.entity';

@Injectable()
export class TablesService {
  constructor(@InjectModel(Restaurants) private resModel: typeof Restaurants,
      @InjectModel(Tables) private tableModel: typeof Tables){}
        async create(createTableDto: CreateTableDto) {
          const restaurent = await this.resModel.findByPk(createTableDto.restaurent_id);
    
          if (!restaurent) {
              throw new BadRequestException(`Restaurent ID ${createTableDto.restaurent_id} topilmadi`);
          }
          return await this.tableModel.create(createTableDto);
        }
        
      
        async findAll(query: {
          restaurent_id?: string;
          table_number?: string;
          capacity?: string;
          limit?: string;
          offset?: string;
        }) {
          const whereClause: any = {};
        
          if (query.restaurent_id) {
            whereClause.restaurent_id = +query.restaurent_id;
          }
        
          if (query.table_number) {
            whereClause.table_number = +query.table_number;
          }
        
          if (query.capacity) {
            whereClause.capacity = +query.capacity;
          }
        
        
          return await this.tableModel.findAll({
            where: whereClause,
            include: [
              {
                model: Restaurants,
                attributes: ['id', 'name', 'description', 'phone_number', 'address'],
              },
            ],
          });
        }
        
        
      
        async findOne(id: number) {
          return await this.tableModel.findByPk(id);
        }
      
        async update(id: number, updateTableDto: UpdateTableDto) {
          return await this.tableModel.update(updateTableDto, {
            where: {id}, returning: true
          });
        }
      
        async remove(id: number) {
          const deleted = await this.tableModel.destroy({where: {id}});
          if(!deleted){
            throw new NotFoundException(`Table ${id} not found`);
          }
          return {message: "Deleted succefuly"};
    }
}
