import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from 'src/meal/entities/meal.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { MealService } from 'src/meal/meal.service';
import { ITotalLikesPerMeal } from './likes.interface';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const [meal, user] = await Promise.all([
      this.mealRepository.findOneByOrFail({ id: createLikeDto.mealId }),
      this.userRepository.findOneByOrFail({ id: createLikeDto.userId }),
    ]);

    const like = this.likeRepository.create({ meal, user });
    return this.likeRepository.save(like);
  }

  async getTotalLikesPerMeal(mealId: number): Promise<number> {
    return await this.likeRepository.count({ where: { meal: { id: mealId } } });
  }

  async getTotalLikesForAllMeals(userId: number): Promise<ITotalLikesPerMeal[]> {  
    const meals = await this.mealRepository.find();
    let totalLikesPerMeal: ITotalLikesPerMeal[] = [];
    for (let meal of meals) {
      totalLikesPerMeal.push({
        likes: await this.likeRepository.count({ where: { meal: { id: meal.id } } }),
        likedByUser: await this.likeRepository.count({ where: { meal: { id: meal.id }, user: { id: userId } } }) > 0
      }
      );
    }   
    return totalLikesPerMeal;
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
