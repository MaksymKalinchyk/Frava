import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { IFood } from './interfaces/food.interface';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class FoodService {
  private readonly logger = new Logger(FoodService.name);
  constructor(private readonly httpService: HttpService) {}

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

    return {
      nutriments: data.product.nutriments,
      serving_size: parseInt(servingAsString),
      serving_unit: servingAsString.replace(/\d/g, ''),
      product_name: data.product.product_name,
      ecoscore_extended_data: data.product.ecoscore_extended_data,
    }
  }
}
