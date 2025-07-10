import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurants } from './restaurants/entities/restaurant.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MenusModule } from './menus/menus.module';
import { Menus } from './menus/entities/menu.entity';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { MenuImagesModule } from './menu_images/menu_images.module';
import { MenuImage } from './menu_images/entities/menu_image.entity';
import { BotModule } from './bot/bot.module';
import { TablesModule } from './tables/tables.module';
import { Tables } from './tables/entities/table.entity';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuCategory } from './menu-category/entities/menu-category.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/entities/notification.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/entities/review.entity';
import { ManagerCategoryModule } from './manager-category/manager-category.module';
import { ManagerCategory } from './manager-category/entities/manager-category.entity';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/entities/payment.entity';
import { Reservation } from './reservations/entities/reservation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal:true
    }),
    SequelizeModule.forRoot({
       dialect: "postgres",
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        models: [User, Restaurants, Menus, MenuImage, Tables, MenuCategory, Notification, Review, ManagerCategory, Reservation, Payment],
        autoLoadModels: true,
        logging: false,
        sync: { alter: true },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/file',
    }),
    UsersModule,
    RestaurantsModule,
    MenusModule,
    MailModule,
    AuthModule,
    MenuImagesModule,
    // BotModule,
    TablesModule,
    MenuCategoryModule,
    NotificationsModule,
    ReviewsModule,
    ManagerCategoryModule,
    ReservationsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
