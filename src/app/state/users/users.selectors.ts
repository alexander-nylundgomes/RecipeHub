import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./users-state";
import { User } from "../../interfaces/user";
import { Recipe } from "../../interfaces/recipe";

export const selectUserState = createFeatureSelector<Readonly<UserState>>('user');
export const selectLoggedInUser = createSelector(selectUserState, (state: UserState): User | undefined => state.loggedInUser.data);
export const selectLikedRecipes = createSelector(selectUserState, (state: UserState): number[] => state.likedRecipes.data);
export const selectFollowsUsers = createSelector(selectUserState, (state: UserState): User[] => state.followsUsers.data);

export const selectFollowsUsersLoaded = createSelector(selectUserState, (state: UserState): boolean => state.followsUsers.loaded);
export const selectLikedRecipesLoaded = createSelector(selectUserState, (state: UserState): boolean => state.likedRecipes.loaded);