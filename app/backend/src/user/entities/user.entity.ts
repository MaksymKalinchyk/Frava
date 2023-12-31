import { Comment } from 'src/comments/entities/comment.entity';
import { FriendRequest } from 'src/friend-request/entities/friend-request.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Meal } from 'src/meal/entities/meal.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';

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
  @JoinTable()
  meals: Meal[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
  sentFriendRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, friendRequest => friendRequest.receiver)
  receivedFriendRequests: FriendRequest[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}