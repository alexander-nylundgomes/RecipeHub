import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Recipe } from '../../interfaces/recipe';
import { Store } from '@ngrx/store';
import { selectRecipes } from '../../state/recipes/recipes.selectors';
import { RecipeCardListComponent } from '../../components/recipe-card-list/recipe-card-list.component';
import { AsyncPipe } from '@angular/common';
import { selectLikedRecipes, selectLoggedInUser } from '../../state/users/users.selectors';
import { IsLikedMap } from '../../interfaces/is-liked-map';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeCardListComponent, AsyncPipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit, OnDestroy{

  allRecipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;
  likedRecipes$: Observable<ReadonlyArray<number>> = EMPTY;
  destroyed$: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();
  isLikedMap: IsLikedMap = {};
  loggedInUser$: Observable<User | undefined> = EMPTY;

  store: Store = inject(Store);

  ngOnInit(): void {
    this.allRecipes$ = this.store.select(selectRecipes);
    this.likedRecipes$ = this.store.select(selectLikedRecipes);
    this.loggedInUser$ = this.store.select(selectLoggedInUser);

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
