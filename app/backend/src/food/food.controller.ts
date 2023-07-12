import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':barcode')
  findOne(@Param('barcode') barcode: string) {
    return this.foodService.findOne(barcode);
  }
}
