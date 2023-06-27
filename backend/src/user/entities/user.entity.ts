import { FriendRequestEntity } from 'src/friend-request/entities/friend-request.entity';
import { Meal } from 'src/meal/entities/meal.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Meal, meal => meal.user)
  meals: Meal[];

  @OneToMany(() => FriendRequestEntity, (friendRequest) => friendRequest.sender)
  sentFriendRequests: FriendRequestEntity[];

  @OneToMany(() => FriendRequestEntity, friendRequest => friendRequest.receiver)
  receivedFriendRequests: FriendRequestEntity[];
}