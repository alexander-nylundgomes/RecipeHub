import { RecipeIngredient } from "./recipe-ingredient";
import { RecipeStep } from "./recipe-step";
import { User } from "./user";

export interface Recipe {
    ingredients: Array<RecipeIngredient>,
    title: string,
    steps: Array<RecipeStep>,
    id: number,
    isLiked: boolean,
    rating: number,
    description: string,
    createdBy: User
}
