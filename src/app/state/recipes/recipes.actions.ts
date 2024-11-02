import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Recipe } from '../../interfaces/recipe';

export const RecipeActions = createActionGroup({
    source: 'Recipes',
    events: {
        'Add recipe': props<{ recipe: Recipe }>(),
        'Remove recipe': props<{ id: number }>(),
        'Update recipe': props<{ recipe: Recipe }>(),
        'Load recipes': emptyProps
    }
})

export const RecipeApiActions = createActionGroup({
    source: 'Recipe API',
    events: {
        'Load Recipes Success': props<{recipes: Array<Recipe>}>(),
        'Load Recipes Failure': props<{error: string}>()
    }
})