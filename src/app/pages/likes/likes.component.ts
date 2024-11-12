import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecipeCardListComponent } from '../../components/recipe-card-list/recipe-card-list.component';
import { Store } from '@ngrx/store';
import { combineLatest, EMPTY, map, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { selectLikedRecipes, selectLoggedInUser } from '../../state/users/users.selectors';
import { IsLikedMap } from '../../interfaces/is-liked-map';
import { Recipe } from '../../interfaces/recipe';
import { selectRecipes } from '../../state/recipes/recipes.selectors';
import { AsyncPipe } from '@angular/common';
import { User } from '../../interfaces/user';

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
  loggedInUser$: Observable<Readonly<User | undefined>> = EMPTY;
  
  destroyed$: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();

  isLikedMap: IsLikedMap = {};

  ngOnInit(): void {
    this.likedRecipes$ = this.store.select(selectLikedRecipes).pipe(takeUntil(this.destroyed$));
    this.allRecipes$ = this.store.select(selectRecipes).pipe(takeUntil(this.destroyed$));
    this.loggedInUser$ = this.store.select(selectLoggedInUser).pipe(takeUntil(this.destroyed$));

    // Combine likedRecipes$ and allRecipes$ to get only liked recipes
    this.filteredLikedRecipes$ = combineLatest([this.likedRecipes$, this.allRecipes$]).pipe(
      map(([likedRecipeIds, allRecipes]) => 
        allRecipes.filter(recipe => likedRecipeIds.includes(recipe.id))
      ),
      takeUntil(this.destroyed$)
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
