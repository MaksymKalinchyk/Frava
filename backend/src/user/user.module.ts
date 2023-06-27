import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { FriendRequest } from 'src/friend-request/entities/friend-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}