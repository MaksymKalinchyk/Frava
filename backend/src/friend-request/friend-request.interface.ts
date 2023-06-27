import { User } from "src/user/entities/user.entity";

export type RequestStatus = 'Pending' | 'Accepted' | 'Declined';

export interface FriendRequestStatus {
    status?: FriendRequest
}

export interface FriendRequest {
    id?: number,
    sender?: User,
    receiver?: User,
    status?: RequestStatus,
}