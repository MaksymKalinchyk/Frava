import { User } from "src/user/entities/user.entity";
import { UserInterface } from "src/user/user.interface";

export type RequestStatus = 'Pending' | 'Accepted' | 'Declined';

export interface FriendRequestStatus {
    status?: IFriendRequest
}

export interface IFriendRequest {
    id?: number,
    sender?: User,
    receiver?: User,
    status?: RequestStatus,
}