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

  store: Store = inject(Store);
  
  allRecipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;
  likedRecipes$: Observable<ReadonlyArray<number>> = EMPTY;
  loggedInUser$: Observable<User | undefined> = EMPTY;

  destroyed$: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();
  
  isLikedMap: IsLikedMap = {};

  ngOnInit(): void {
    this.allRecipes$ = this.store.select(selectRecipes).pipe(takeUntil(this.destroyed$));
    this.likedRecipes$ = this.store.select(selectLikedRecipes).pipe(takeUntil(this.destroyed$));
    this.loggedInUser$ = this.store.select(selectLoggedInUser).pipe(takeUntil(this.destroyed$));

    // A change in likes has occurred. Update the map
    this.likedRecipes$.subscribe((likes) => {
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
