import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../../interfaces/recipe";
import { RecipeActions, RecipeApiActions } from "./recipes.actions";

export const initialRecipeState: Array<Recipe> = [];

export const recipeReducer = createReducer(
    initialRecipeState,
    on(RecipeActions.addRecipe, (state, { recipe }) => { return [...state, recipe] }),
    on(RecipeActions.removeRecipe, (state, { recipeId }) => {
        const index = state.findIndex(recipe => recipe.id == recipeId);
        state.splice(index, 1);
        return state;
    }),
    on(RecipeActions.updateRecipe, (state, { recipe }) => {
        const index = state.findIndex(_recipe => _recipe.id == recipe.id);
        if(index) state[index] = recipe;
        return state;
    }),
    on(RecipeApiActions.loadRecipesSuccess, (_state, { recipes }) => recipes)
)
