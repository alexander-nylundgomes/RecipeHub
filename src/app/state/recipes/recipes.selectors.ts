import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Recipe } from '../../interfaces/recipe';

export const selectRecipes = createFeatureSelector<ReadonlyArray<Recipe>>('recipes');
export const selectUsedIngredients = createSelector(selectRecipes, (recipes) => {
    recipes.map(recipe => recipe.ingredients);
})