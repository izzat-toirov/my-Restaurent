import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { Reservation } from '../reservations/entities/reservation.entity';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment,
          @InjectModel(Reservation) private reservationModel: typeof Reservation){}
            async create(createPaymentDto: CreatePaymentDto) {
              const reservation = await this.reservationModel.findByPk(createPaymentDto.reservation_id);
        
              if (!reservation) {
                  throw new BadRequestException(`Reservation ID ${createPaymentDto.reservation_id} topilmadi`);
              }
              return await this.paymentModel.create(createPaymentDto);
            }
            
          
            async findAll() {
              return await this.paymentModel.findAll({
                include: [
                  {
                    model: Reservation,
                  },
                ],
              });
            }
            
          
            async findOne(id: number) {
              return await this.paymentModel.findByPk(id);
            }
          
            async update(id: number, updatePaymentDto: UpdatePaymentDto) {
              return await this.paymentModel.update(updatePaymentDto, {
                where: {id}, returning: true
              });
            }
          
            async remove(id: number) {
              const deleted = await this.paymentModel.destroy({where: {id}});
              if(!deleted){
                throw new NotFoundException(`Reservation ${id} not found`);
              }
              return {message: "Deleted succefuly"};
        }
}
