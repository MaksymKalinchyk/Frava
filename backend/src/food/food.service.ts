import { Injectable, Logger } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { IFood } from './interfaces/food.interface';
import { INutrient } from './interfaces/nutrients.interface';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class FoodService {
  private readonly logger = new Logger(FoodService.name);
  constructor(private readonly httpService: HttpService) {}
  create(createFoodDto: CreateFoodDto) {
    return 'This action adds a new food';
  }

  async findAll() {
    
  }

  async findOne(barcode: string) : Promise<IProduct> {
    const { data } = await firstValueFrom(
      this.httpService.get<IFood>('https://world.openfoodfacts.org/api/v2/product/' + barcode).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );

    const servingAsString = data.product.serving_size.toString();
    const servingUnit = servingAsString.replace(/\d/g, '');
    const servingSize = parseInt(servingAsString);
    const filteredData: IProduct = {
      nutriments: data.product.nutriments,
      serving_size: servingSize,
      serving_unit: servingUnit,
      product_name: data.product.product_name,
      ecoscore_extended_data: data.product.ecoscore_extended_data,
    }
    return filteredData;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
