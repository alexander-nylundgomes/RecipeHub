import { Ingredient } from "./ingredient";
import { Measurement } from "./measurement";

export interface RecipeIngredient{
    name: string
    amount: number;
    measurement: Measurement
}