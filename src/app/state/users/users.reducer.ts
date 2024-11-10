import { createReducer, on } from "@ngrx/store";
import { User } from "../../interfaces/user";
import { Recipe } from "../../interfaces/recipe"; // Assuming you have a Recipe interface
import { UserActions, UserApiActions } from "./users.actions";
import { UserState } from "./users-state";

export const initialUserState: UserState = {
  loggedInUser: {
    loaded: false,
    data: undefined
  },
  followsUsers: {
    loaded: false,
    data: [] as User[]
  },
  likedRecipes: {
    loaded: false,
    data: [] as number[]
  }
};

export const userReducer = createReducer(
  initialUserState,
  
  // User Follow/Unfollow Actions
  on(UserActions.followUser, (state, { user }) => ({
    ...state,
    followsUsers: {
      loaded: state.followsUsers.loaded,
      data: state.followsUsers.data.find(followedUser => followedUser.id === user.id)
      ? state.followsUsers.data
      : [...state.followsUsers.data, user]
    }
  })),
  on(UserActions.unfollowUser, (state, { id }) => ({
    ...state,
    followsUsers: {
      loaded: state.followsUsers.loaded,
      data: state.followsUsers.data.filter(user => user.id !== id)
    }
  })),

  // Recipe Like/Unlike Actions
  on(UserActions.likeRecipe, (state, { recipeId }) => ({
    ...state,
    likedRecipes: {
      loaded: state.likedRecipes.loaded,
      data: (state.likedRecipes.data.includes(recipeId)
      ? state.likedRecipes.data
      : [...state.likedRecipes.data, recipeId])
    }
  })),
  on(UserActions.unlikeRecipe, (state, { recipeId }) => ({
    ...state,
    likedRecipes: {
      loaded: state.likedRecipes.loaded,
      data: state.likedRecipes.data.filter(likedRecipeId => likedRecipeId !== recipeId)
    }
  })),

  // Edit user
  on(UserActions.editUser, (state, { user }) => ({
    ...state,
    loggedInUser: {
      loaded: state.likedRecipes.loaded,
      data: user
    }
  })),

  // API Success Actions
  on(UserApiActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loggedInUser: {
      data: user,
      loaded: true
    }
  })),
  on(UserApiActions.loadFollowsUsersSuccess, (state, { users }) => ({
    ...state,
    followsUsers: {
      data: users,
      loaded: true
    }
  })),
  on(UserApiActions.loadLikedRecipesSuccess, (state, { recipeIds }) => ({
    ...state,
    likedRecipes: {
      data: recipeIds,
      loaded: true
    }
  }))
);
