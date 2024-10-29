import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { Recipe } from '../../interfaces/recipe';
import { selectRecipe } from '../../state/recipes/recipes.selectors';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit{

  recipe$: Observable<Readonly<Recipe | undefined>> = EMPTY;
  recipeId: number | null = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public router: Router
  ){}

  ngOnInit(): void {
    this.recipe$ = this.route.paramMap.pipe(switchMap(params => {
      this.recipeId = Number(params.get('id'));
      return this.store.select(selectRecipe(this.recipeId))
    })
  );
  }
}
