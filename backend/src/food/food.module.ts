import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  imports: [HttpModule],
})
export class FoodModule {}
