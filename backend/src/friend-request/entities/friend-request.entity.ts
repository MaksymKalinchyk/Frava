import { User } from "src/user/entities/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity, CreateDateColumn } from "typeorm";
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;


}
