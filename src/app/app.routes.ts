import { Routes } from '@angular/router';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { SwipeComponent } from './pages/swipe/swipe.component';

export const routes: Routes = [
    {path: "", component: RecipesComponent},
    {path: "recipe/:id", component: RecipeComponent},
    {path: "recipe/:id/edit", component: EditRecipeComponent},
    {path: "swipe", component: SwipeComponent},
];
