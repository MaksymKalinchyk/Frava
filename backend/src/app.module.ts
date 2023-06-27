import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MealModule } from './meal/meal.module';
import { Meal } from './meal/entities/meal.entity';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { FriendRequest } from './friend-request/entities/friend-request.entity';
import { MealItemModule } from './meal-item/meal-item.module';
import { MealItem } from './meal-item/entities/meal-item.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [FoodModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'work',
    entities: [User, Meal, FriendRequest, MealItem],
    synchronize: true,
  }), UsersModule, AuthModule, MealModule, FriendRequestModule, MealItemModule],
})
export class AppModule {}
