import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MealItemService } from './meal-item.service';
import { CreateMealItemDto } from './dto/create-meal-item.dto';
import { UpdateMealItemDto } from './dto/update-meal-item.dto';

@Controller('meal-item')
export class MealItemController {
  constructor(private readonly mealItemService: MealItemService) {}

  @Post()
  create(@Body() createMealItemDto: CreateMealItemDto) {
    return this.mealItemService.create(createMealItemDto);
  }

  @Get()
  findAll() {
    return this.mealItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealItemDto: UpdateMealItemDto) {
    return this.mealItemService.update(+id, updateMealItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealItemService.remove(+id);
  }
}
