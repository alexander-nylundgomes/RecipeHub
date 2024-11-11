import { Recipe } from "../../interfaces/recipe";

export interface RecipeState {
    data: Recipe[];
    loaded: boolean;
}