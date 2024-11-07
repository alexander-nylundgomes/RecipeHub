import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../interfaces/user";

export const UserActions = createActionGroup({
    source: 'User',
    events: {
        'Like recipe': props<{ id: number }>(),
        'Unlike recipe': props<{ id: number }>(),
        'Follow user': props<{ id: number }>(),
        'Unfollow user': props<{ id: number }>(),
        'Load user': emptyProps
    }
})


export const UserApiActions = createActionGroup({
    source: 'User API',
    events: {
        'Load User Success': props<{user: User}>(),
        'Load User Failure': props<{error: string}>()
    }
})