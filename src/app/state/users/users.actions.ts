import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../interfaces/user";
import { Recipe } from "../../interfaces/recipe";

export const UserActions = createActionGroup({
    source: 'User',
    events: {
        'Like recipe': props<{ recipeId: number }>(),
        'Unlike recipe': props<{ recipeId: number }>(),
        'Follow user': props<{ user: User }>(),
        'Unfollow user': props<{ id: number }>(),
        'Edit user': props<{user: User }>(),

        'Load user': emptyProps,
        'Load follows users': emptyProps,
        'Load liked recipes': emptyProps
    }
})


export const UserApiActions = createActionGroup({
    source: 'User API',
    events: {
        'Load User Success': props<{user: User}>(),
        'Load User Failure': props<{error: string}>(),

        'Load Follows Users Success': props<{users: User[]}>(),
        'Load Follows Users Failure': props<{error: string}>(),
        
        'Load Liked Recipes Success': props<{recipeIds: number[]}>(),
        'Load Liked Recipes Failure': props<{error: string}>(),
    }
})