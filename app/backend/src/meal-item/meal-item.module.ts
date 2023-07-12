import { Module } from '@nestjs/common';
import { MealItemService } from './meal-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from 'src/meal/entities/meal.entity';
import { MealItem } from './entities/meal-item.entity';
import { MealItemController } from './meal-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, MealItem])],
  controllers: [MealItemController],
  providers: [MealItemService]
})
export class MealItemModule {}
