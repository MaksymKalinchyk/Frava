import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ITotalLikesPerMeal } from './likes.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.likesService.findOne(+id);
  // }

  @Get(':id/total')
  getTotalLikesPerMeal(@Param('id') mealId: string): Promise<number> {
    return this.likesService.getTotalLikesPerMeal(+mealId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/total')
  getTotalLikesForAllMeals(@Request() req: any): Promise<ITotalLikesPerMeal[]> {
    return this.likesService.getTotalLikesForAllMeals(req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    
    return this.likesService.remove(id);
  }
}
