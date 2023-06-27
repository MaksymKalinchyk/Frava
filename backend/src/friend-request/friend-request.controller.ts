import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Put,
} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { FriendRequest } from './entities/friend-request.entity';
import { Observable } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { UserInterface } from 'src/user/user.interface';
import { FriendRequestStatus, RequestStatus } from './friend-request.interface';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Post()
  create(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return this.friendRequestService.create(createFriendRequestDto);
  }

  @Get()
  findAll() {
    return this.friendRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFriendRequestDto: UpdateFriendRequestDto,
  ) {
    return this.friendRequestService.update(+id, updateFriendRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendRequestService.remove(+id);
  }

  @Post('/send/:receiverId')
  sendFriendRequest(
    @Param('receiverId') receiverId: string,
    @Body() body: UserInterface,
  ): Promise<FriendRequest> {
    return this.friendRequestService.sendFriendRequest(parseInt(receiverId), body);
  }

  @Put('/response/:friendRequestId')
  respondToFriendRequest(@Param('friendRequestId') friendRequestIdString: string, @Body() statusResponse: UpdateFriendRequestDto) {
    return this.friendRequestService.respondToFriendRequest(parseInt(friendRequestIdString), statusResponse);
  }
}
