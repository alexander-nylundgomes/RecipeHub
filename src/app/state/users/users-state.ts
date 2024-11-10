import { Recipe } from "../../interfaces/recipe";
import { User } from "../../interfaces/user";

export interface UserState {
	loggedInUser: {
		loaded: boolean,
		data?: User
	},
	followsUsers: {
		loaded: boolean,
		data: User[]
	},
	likedRecipes: {
		loaded: boolean,
		data: number[]
	},
} 
