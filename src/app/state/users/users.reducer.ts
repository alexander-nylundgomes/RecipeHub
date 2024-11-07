import { createReducer, on } from "@ngrx/store"
import { User } from "../../interfaces/user"
import { UserActions, UserApiActions } from "./users.actions"

interface UserState {
	loggedInUser: User | null,
	followsUsers: number[],
	likedRecipes: number[],
} 

export const initialUserState: UserState = {
	loggedInUser: null,
	followsUsers: [],
	likedRecipes: []
}

export const userReducer = createReducer(
	initialUserState,
	on(UserActions.followUser, (state, { id }) => ({...state, follows: [...state.followsUsers, id]})),
	on(UserActions.unfollowUser, (state, { id }) => ({...state, follows: state.followsUsers.filter(existingUserId => existingUserId != id)})),
	
	on(UserActions.likeRecipe, (state, { id }) => ({...state, likedRecipes: [...state.likedRecipes, id]})),
	on(UserActions.unlikeRecipe, (state, { id }) => ({...state, likedRecipes: state.likedRecipes.filter(existingRecipeId => existingRecipeId != id)})),
	
	on(UserApiActions.loadUserSuccess, (state, { user }) => ({...state, loggedInUser: user})),
)