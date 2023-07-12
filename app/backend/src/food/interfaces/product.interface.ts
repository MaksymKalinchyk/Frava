import { INutrient } from "./nutrients.interface";
import { Warnings } from "./warnings.interface";

export interface IProduct {
    nutriments: INutrient
    serving_size: number,
    serving_unit: string,
    product_name: string,
    ecoscore_extended_data: Warnings;
}