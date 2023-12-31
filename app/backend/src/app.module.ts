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
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/entities/like.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FoodModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'mysql',
      password: 'root',
      database: 'work',
      // entities: [User, Meal, FriendRequest, MealItem, Like, Comment],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MealModule,
    FriendRequestModule,
    MealItemModule,
    LikesModule,
    CommentsModule,
  ],
})
export class AppModule {}
