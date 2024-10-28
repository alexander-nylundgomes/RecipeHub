import { Ingredient } from "./ingredient";
import { RecipeStep } from "./recipe-step";

export interface Recipe {
    ingredients: Array<Ingredient>;
    title: string;
    steps: Array<RecipeStep>;
    id: number
}
