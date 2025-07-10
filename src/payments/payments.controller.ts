import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtGuard } from '../common/guards/user.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles('CUSTOMER', 'ADMIN', 'SUPER_ADMIN')
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Roles('CUSTOMER', 'ADMIN', 'SUPER_ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Roles('CUSTOMER', 'ADMIN', 'SUPER_ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Roles('CUSTOMER', 'ADMIN', 'SUPER_ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
