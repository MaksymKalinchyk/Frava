import { MealItem } from 'src/meal-item/entities/meal-item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => MealItem, mealItem => mealItem.meal)
  mealItems: MealItem[];

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
