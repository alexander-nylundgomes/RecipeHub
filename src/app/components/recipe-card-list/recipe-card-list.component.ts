import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Store } from '@ngrx/store';
import { Recipe } from '../../interfaces/recipe';
import { EMPTY, Observable } from 'rxjs';
import { selectRecipes } from '../../state/recipes/recipes.selectors';
import { AsyncPipe } from '@angular/common';
import { IsLikedMap } from '../../interfaces/is-liked-map';

@Component({
  selector: 'app-recipe-card-list',
  standalone: true,
  imports: [RecipeCardComponent, AsyncPipe],
  templateUrl: './recipe-card-list.component.html',
  styleUrl: './recipe-card-list.component.scss'
})
export class RecipeCardListComponent{
  
  store: Store = inject(Store);
  recipes: InputSignal<ReadonlyArray<Recipe>> = input.required();
  likes: InputSignal<IsLikedMap> = input.required();
  loggedInUserId: InputSignal<number> = input.required();
}
