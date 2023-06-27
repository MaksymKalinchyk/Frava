import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createMealDto: CreateMealDto): Promise<Meal> {
    let meal = this.mealRepository.create(createMealDto);
    meal.user = await this.userRepository.findOneByOrFail({id: createMealDto.userId});
    return this.mealRepository.save(meal);
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
