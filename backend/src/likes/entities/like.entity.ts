import { Meal } from 'src/meal/entities/meal.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index(['user', 'meal'], { unique: true })
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Meal, (meal) => meal.likes)
  meal: Meal;

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
