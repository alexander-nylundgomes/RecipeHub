import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { recipeReducer } from './state/recipes/recipes.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { RecipeEffects } from './state/recipes/recipes.effects';
import { UserEffects } from './state/users/users.effects';
import { userReducer } from './state/users/users.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
        recipes: recipeReducer,
        user: userReducer
    }),
    provideEffects([RecipeEffects, UserEffects])
]
};
