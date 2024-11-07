import { Routes } from '@angular/router';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { LikesComponent } from './pages/likes/likes.component';
import { FollowingComponent } from './pages/following/following.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    {path: "", component: RecipesComponent},
    {path: "recipe/:id", component: RecipeComponent},
    {path: "recipe/:id/edit", component: EditRecipeComponent},
    {path: "user/:id/likes", component: LikesComponent},
    {path: "user/:id/following", component: FollowingComponent},
    {path: "settings", component: SettingsComponent},
];
