import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ITotalCommentsPerMeal } from './comments.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Request() req: any) {
    return this.commentsService.create(createCommentDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Get('meal/:id')
  findCommentsForMeal(@Param('id') mealId: string) {
    return this.commentsService.findCommentsForMeal(+mealId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/count/all')
  getCommentAmountPerMeal(@Request() req: any): Promise<ITotalCommentsPerMeal[]> {
    return this.commentsService.getCommentAmountPerMeal(req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
