import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from 'src/meal/entities/meal.entity';
import { User } from 'src/user/entities/user.entity';
import { Like } from './entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, User, Like])],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
