import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipeService } from "../../services/recipe.service";
import { RecipeActions, RecipeApiActions } from "./recipes.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class RecipeEffects{

    // Injects
	actions$: Actions = inject(Actions);
    recipeService: RecipeService = inject(RecipeService);

    loadRecipes$ = createEffect(() => 
        this.actions$.pipe(ofType(RecipeActions.loadRecipes), mergeMap(() => 
            this.recipeService.getRecipes().pipe(
                map(recipes => RecipeApiActions.loadRecipesSuccess({ recipes })),
                catchError(error => of(RecipeApiActions.loadRecipesFailure({ error })))
            )
        ))
    )
}