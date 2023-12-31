import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Meal } from 'src/meal/entities/meal.entity';
import { ITotalCommentsPerMeal } from './comments.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    const comment =  this.commentsRepository.create(createCommentDto);
    comment.user = await this.usersRepository.findOneByOrFail({ id: userId });
    comment.meal = await this.mealRepository.findOneByOrFail({ id: createCommentDto.mealId });
    return this.commentsRepository.save(comment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  findCommentsForMeal(mealId: number) {
    return this.commentsRepository.find({
      where: {
        meal: {
          id: mealId
        }
      },
      relations: {
        user: true
      }
    });
  }

  async getCommentAmountPerMeal(userId: number): Promise<ITotalCommentsPerMeal[]> {
    const meals = (await this.mealRepository.find()).sort((a, b) => b.id - a.id);
    let totalCommentsPerMeal: ITotalCommentsPerMeal[] = [];
    for (let meal of meals) {
      totalCommentsPerMeal.push({
        comments: await this.commentsRepository.count({ where: { meal: { id: meal.id } } })
      }
      );
    }   
    return totalCommentsPerMeal;
  }
  

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
