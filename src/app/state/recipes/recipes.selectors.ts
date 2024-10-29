import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Recipe } from '../../interfaces/recipe';

export const selectRecipes = createFeatureSelector<ReadonlyArray<Recipe>>('recipes');

export const selectRecipe = (id: number) => createSelector(selectRecipes, (recipes) => {
    return recipes.find(recipe => recipe.id === id);
}) 

export const selectUsedIngredients = createSelector(selectRecipes, (recipes) => {
    recipes.map(recipe => recipe.ingredients);
})