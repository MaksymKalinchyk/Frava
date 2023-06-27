import { Meal } from 'src/meal/entities/meal.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinTable } from 'typeorm';

@Entity()
export class MealItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calories: number;

  @Column()
  mealItemName: string;

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

  @ManyToOne(() => Meal, (meal) => meal.mealItems, { cascade: true })
  @JoinTable()
  meal: Meal;

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
