import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meal } from './entities/meal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { MealItem } from 'src/meal-item/entities/meal-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, User, MealItem])],
  controllers: [MealController],
  providers: [MealService]
})
export class MealModule {}
