import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Recipe } from '../../interfaces/recipe';
import { RecipeState } from './recipes-state';

export const selectRecipesState = createFeatureSelector<Readonly<RecipeState>>('recipes');
export const selectRecipesLoaded = createSelector(selectRecipesState, (state) => state.loaded);
export const selectRecipes = createSelector(selectRecipesState, (state) => state.data); 
export const selectRecipe = (id: number) => createSelector(selectRecipesState, (state) => state.data.find(recipe => recipe.id === id)); 
export const selectRecipesForUser = (userId: number) => createSelector(selectRecipesState, (state) => state.data.filter(recipe => recipe.createdBy.id === userId));