import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../../interfaces/recipe";
import { RecipeActions, RecipeApiActions } from "./recipes.actions";
import { RecipeState } from "./recipes-state";

export const initialRecipeState: RecipeState = {
    data: [],
    loaded: false
};

export const recipeReducer = createReducer(
    initialRecipeState,
    on(RecipeActions.addRecipe, (state, { recipe }) => ({ ...state, data: [...state.data, recipe] })),
    on(RecipeActions.removeRecipe, (state, { id }) => ({ ...state, data: state.data.filter(recipe => recipe.id !== id) })),
    on(RecipeActions.updateRecipe, (state, { recipe }) => ({ ...state, data: state.data.map(r => r.id === recipe.id ? recipe : r) })),
    on(RecipeApiActions.loadRecipesSuccess, (_, { recipes }) => ({ data: recipes, loaded: true })),
);