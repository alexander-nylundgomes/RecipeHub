import { RecipeIngredient } from "./recipe-ingredient";
import { User } from "./user";

export interface Recipe {
    ingredients: Array<RecipeIngredient>,
    title: string,
    steps: Array<String>,
    id: number,
    rating: number,
    description: string,
    createdBy: User,
    estimatedCookingTime: string,
    caloriesPerServing: number
}
