import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../../interfaces/recipe";
import { RecipeActions, RecipeApiActions } from "./recipes.actions";

export const initialRecipeState: Recipe[] = [];

export const recipeReducer = createReducer(
    initialRecipeState,
    on(RecipeActions.addRecipe, (state, { recipe }) => [...state, recipe]),
    on(RecipeActions.removeRecipe, (state, { id }) => 
        state.filter(recipe => recipe.id !== id)
    ),
    on(RecipeActions.updateRecipe, (state, { recipe }) => 
        state.map(r => r.id === recipe.id ? recipe : r)
    ),
    on(RecipeApiActions.loadRecipesSuccess, (_, { recipes }) => [...recipes])
);