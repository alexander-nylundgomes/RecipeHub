import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeCardListComponent } from '../../components/recipe-card-list/recipe-card-list.component';
import { Store } from '@ngrx/store';
import { combineLatest, defaultIfEmpty, EMPTY, map, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { selectLikedRecipes } from '../../state/users/users.selectors';
import { IsLikedMap } from '../../interfaces/is-liked-map';
import { Recipe } from '../../interfaces/recipe';
import { selectRecipe, selectRecipes } from '../../state/recipes/recipes.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [RecipeCardListComponent, AsyncPipe],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss'
})
export class LikesComponent implements OnInit, OnDestroy{

  store: Store= inject(Store);
  likedRecipes$: Observable<ReadonlyArray<number>> = EMPTY;
  allRecipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;
  filteredLikedRecipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;
  destroyed$: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();

  isLikedMap: IsLikedMap = {};

  ngOnInit(): void {
    this.likedRecipes$ = this.store.select(selectLikedRecipes)
    this.allRecipes$ = this.store.select(selectRecipes)

    // Combine likedRecipes$ and allRecipes$ to get only liked recipes
    this.filteredLikedRecipes$ = combineLatest([this.likedRecipes$, this.allRecipes$]).pipe(
      takeUntil(this.destroyed$),
      map(([likedRecipeIds, allRecipes]) => 
        allRecipes.filter(recipe => likedRecipeIds.includes(recipe.id))
      )
    );

    // A change in likes has occurred. Update the map
    this.likedRecipes$.pipe(takeUntil(this.destroyed$)).subscribe((likes) => {
      this.isLikedMap = {};
      likes.forEach((likedRecipeId) => {
        this.isLikedMap[likedRecipeId] = true;
      })
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
