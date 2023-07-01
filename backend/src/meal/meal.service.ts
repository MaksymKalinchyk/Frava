import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';
import { User } from 'src/user/entities/user.entity';
import { FullMealDto } from './dto/full-meal.dto';
import { FullMeal } from './meal.interface';
import { MealItem } from 'src/meal-item/entities/meal-item.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(MealItem)
    private mealItemRepository: Repository<MealItem>,
  ) {}
  async create(fullMealDto: FullMealDto): Promise<FullMeal> {
    let meal = this.mealRepository.create(fullMealDto.Meal);
    meal.user = await this.userRepository.findOneByOrFail({
      id: fullMealDto.Meal.userId,
    });
    const createdMeal = await this.mealRepository.save(meal);
    const createdMealItems = await Promise.all(
      fullMealDto.MealItems.map(async (MealItem) => {
        let mealItem = this.mealItemRepository.create(MealItem);
        mealItem.meal = createdMeal;
        return await this.mealItemRepository.save(mealItem);
      }),
    );
    console.log(createdMealItems);
    return {
      Meal: createdMeal,
      MealItems: createdMealItems,
    };
  }

  findAll(): Promise<Meal[]> {
    return this.mealRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findAllForUser(id: number): Promise<Meal | any> {
    return this.mealRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} meal`;
  }

  update(id: number, updateMealDto: UpdateMealDto) {
    return `This action updates a #${id} meal`;
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
