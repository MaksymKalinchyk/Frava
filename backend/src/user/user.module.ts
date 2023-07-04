import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { FriendRequest } from 'src/friend-request/entities/friend-request.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest, Like, Comment])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}