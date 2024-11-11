import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { LikesComponent } from './pages/likes/likes.component';
import { FollowingComponent } from './pages/following/following.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RecipesComponent } from './pages/recipes/recipes.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "recipes", component: RecipesComponent},
    {path: "recipe/:id", component: RecipeComponent},
    {path: "recipe/:id/edit", component: EditRecipeComponent},
    {path: "user/:id/likes", component: LikesComponent},
    {path: "user/:id/following", component: FollowingComponent},
    {path: "user/:id", component: UserProfileComponent},
    {path: "settings", component: SettingsComponent},
];
