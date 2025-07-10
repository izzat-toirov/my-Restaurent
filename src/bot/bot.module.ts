// bot.module.ts
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { UsersModule } from '../users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN || '7565110540:AAF1kGCTSGf7oXwI5WBG82feEJB5Ush4eZc',
    }),
    SequelizeModule.forFeature([User]),
    UsersModule,
  ],
  providers: [BotService],
})
export class BotModule {}
