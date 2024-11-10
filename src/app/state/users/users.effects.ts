import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserActions, UserApiActions } from "./users.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { RecipeService } from "../../services/recipe.service";
import { UserService } from "../../services/user.service";
import { inject } from "@angular/core";

export class UserEffects{

	// Injects
	actions$: Actions = inject(Actions);
	userService: UserService = inject(UserService);

	loadUser$ = createEffect(() => 
        this.actions$.pipe(ofType(UserActions.loadUser), mergeMap(() => 
            this.userService.getUser().pipe(
                map(user => UserApiActions.loadUserSuccess({ user })),
                catchError(error => of(UserApiActions.loadUserFailure({ error })))
            )
        ))
    )

	loadFollowsUsers$ = createEffect(() => 
        this.actions$.pipe(ofType(UserActions.loadFollowsUsers), mergeMap(() => 
            this.userService.getFollowsUsers().pipe(
                map(users => UserApiActions.loadFollowsUsersSuccess({ users })),
                catchError(error => of(UserApiActions.loadFollowsUsersFailure({ error })))
            )
        ))
    )

    loadLikedRecipes$ = createEffect(() => 
        this.actions$.pipe(ofType(UserActions.loadLikedRecipes), mergeMap(() => 
            this.userService.getLikes().pipe(
                map(recipeIds => UserApiActions.loadLikedRecipesSuccess({ recipeIds })),
                catchError(error => of(UserApiActions.loadLikedRecipesFailure({ error })))
            )
        ))
    )
}