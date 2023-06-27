import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':barcode')
  findOne(@Param('barcode') barcode: string) {
    return this.foodService.findOne(barcode);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
