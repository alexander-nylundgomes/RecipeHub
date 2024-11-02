import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { EMPTY, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { RecipeActions, RecipeApiActions } from '../../state/recipes/recipes.actions';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { selectRecipes } from '../../state/recipes/recipes.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [AsyncPipe, RecipeItemComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {
  recipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;

  constructor(
    private store: Store,
    public router: Router
  ){

  }

  ngOnInit(): void {
    this.recipes$ = this.store.select(selectRecipes);
  }
}
