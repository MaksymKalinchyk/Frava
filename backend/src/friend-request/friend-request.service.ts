import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import {
  FriendRequest,
  FriendRequestStatus,
  RequestStatus,
} from './friend-request.interface';
import { FriendRequestEntity } from './entities/friend-request.entity';
import { UserInterface } from 'src/user/user.interface';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequestEntity)
    private friendRequestRepository: Repository<FriendRequestEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  respondToFriendRequest(
    friendRequestId: number,
    statusResponse: UpdateFriendRequestDto,
  ) {
    return this.friendRequestRepository.update(friendRequestId, statusResponse);
  }

  async sendFriendRequest(
    receiverId: number,
    creator: UserInterface,
  ): Promise<FriendRequestEntity> {
    
    
    if (receiverId === creator.id) throw new Error("Can't add yourself");
    const receiver = await this.userRepository.findOneByOrFail({
      id: receiverId,
    });

    const sender = await this.userRepository.findOneByOrFail({
      id: creator.id,
    });

    let friendRequest: FriendRequest = {
      sender: sender,
      receiver: receiver,
      status: 'Pending',
    };

    return this.friendRequestRepository.save(friendRequest);
  }

  create(createFriendRequestDto: CreateFriendRequestDto) {
    return 'This action adds a new friendRequest';
  }

  findAll() {
    return `This action returns all friendRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friendRequest`;
  }

  update(id: number, updateFriendRequestDto: UpdateFriendRequestDto) {
    return `This action updates a #${id} friendRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendRequest`;
  }
}
