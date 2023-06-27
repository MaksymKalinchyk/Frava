import { Type } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.meals, { cascade: true })
  @JoinTable()
  user: User;

  @Column({
    type: 'enum',
    enum: ['Breakfast', 'Lunch', 'Dinner'],
    default: 'Breakfast',
  })
  mealType: MealType;

  @Column()
  calories: number;

  @Column()
  mealName: string;

  @Column()
  mealDescription: string;

  @Column()
  carbohydrates: number;

  @Column()
  proteins: number;

  @Column()
  sugars: number;

  @Column()
  fats: number;

  @Column()
  servings: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
