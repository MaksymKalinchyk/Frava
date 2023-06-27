import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendRequestDto } from './create-friend-request.dto';
import { IsNotEmpty } from 'class-validator';
import { RequestStatus } from '../friend-request.interface';

export class UpdateFriendRequestDto extends PartialType(
  CreateFriendRequestDto,
) {
  @IsNotEmpty()
  status: RequestStatus;
}
