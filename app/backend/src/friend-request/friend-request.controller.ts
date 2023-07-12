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
  UseGuards,
} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { FriendRequest } from './entities/friend-request.entity';
import { Observable } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { UserInterface } from 'src/user/user.interface';
import { FriendRequestStatus, RequestStatus } from './friend-request.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.friendRequestService.findOne(+id);
  // }

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

  @UseGuards(JwtAuthGuard)
  @Get('/friends-and-requests/')
  getFriendsAndRequests(@Request() req: any): Promise<FriendRequest[]> {
    return this.friendRequestService.getFriendsAndRequests(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/send/:username')
  sendFriendRequest(
    @Param('username') usernameToAdd: string,
    @Request() req: any,
  ): Promise<FriendRequest> {
    return this.friendRequestService.sendFriendRequest(usernameToAdd, req.user);
  }

  @Put('/response/:friendRequestId')
  respondToFriendRequest(
    @Param('friendRequestId') friendRequestIdString: string,
    @Body() statusResponse: UpdateFriendRequestDto,
  ) {
    return this.friendRequestService.respondToFriendRequest(
      parseInt(friendRequestIdString),
      statusResponse,
    );
  }
}
