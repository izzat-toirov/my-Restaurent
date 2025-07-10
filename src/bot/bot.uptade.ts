import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
  ],
  providers: [BotService],
})
export class BotUpdateModule {}
