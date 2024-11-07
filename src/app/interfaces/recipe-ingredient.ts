import { Ingredient } from "./ingredient";
import { Measurement } from "./measurement";

export interface RecipeIngredient{
    ingredient: Ingredient
    amount: number;
    measurement: Measurement
}