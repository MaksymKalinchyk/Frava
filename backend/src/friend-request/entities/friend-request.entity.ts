import { User } from "src/user/entities/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { RequestStatus } from "../friend-request.interface";

@Entity()
export class FriendRequest {
 @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => User, (user) => user.sentFriendRequests)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedFriendRequests)
  receiver: User;

  @Column()
  status: RequestStatus;


}
