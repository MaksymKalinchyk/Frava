import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Meal } from 'src/meal/entities/meal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, User, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
