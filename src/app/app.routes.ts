import { Routes } from '@angular/router';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeComponent } from './pages/recipe/recipe.component';

export const routes: Routes = [
    {path: "", component: RecipesComponent},
    {path: "recipe/:id", component: RecipeComponent},
];
