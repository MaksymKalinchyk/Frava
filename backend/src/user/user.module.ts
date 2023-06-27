import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { FriendRequestEntity } from 'src/friend-request/entities/friend-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequestEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}