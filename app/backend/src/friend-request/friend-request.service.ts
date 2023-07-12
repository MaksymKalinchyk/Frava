import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import {
  IFriendRequest,
  FriendRequestStatus,
  RequestStatus,
} from './friend-request.interface';
import { FriendRequest } from './entities/friend-request.entity';
import { UserInterface } from 'src/user/user.interface';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
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
    usernameToAdd: string,
    user: UserInterface,
  ): Promise<FriendRequest> {
    
    const sender = await this.userRepository.findOneByOrFail({
      id: user.id,
    });
    if (usernameToAdd === sender.userName) throw new Error("Can't add yourself");
    const receiver = await this.userRepository.findOneByOrFail({
      userName: usernameToAdd,
    });

    let friendRequest: IFriendRequest = {
      sender: sender,
      receiver: receiver,
      status: 'Pending',
    };

    return this.friendRequestRepository.save(friendRequest);
  }

  async getFriendsAndRequests(userId: number): Promise<FriendRequest[]> {
    const user = await this.userRepository.findOneByOrFail({
      id: userId,
    });
    console.log(userId);  
    return await this.friendRequestRepository.find({
      where: [
        { sender: user, status: 'Pending' },
        { sender: user, status: 'Accepted' },
        { receiver: user, status: 'Pending' },
        { receiver: user, status: 'Accepted' },
      ],
      relations: ['sender', 'receiver'],
    });
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
