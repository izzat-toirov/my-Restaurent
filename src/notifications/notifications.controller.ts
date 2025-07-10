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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/user.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfOrRolesGuard } from '../common/guards/self.guard';


@ApiBearerAuth()
@Controller('notifications')
@UseGuards(JwtGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Roles('SUPER_ADMIN', 'ADMIN')
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }


  @Roles('SUPER_ADMIN', 'ADMIN', 'CUSTOMER')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Roles('SUPER_ADMIN', 'ADMIN', 'CUSTOMER')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
