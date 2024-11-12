import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecipeCardListComponent } from '../../components/recipe-card-list/recipe-card-list.component';
import { Store } from '@ngrx/store';
import { combineLatest, EMPTY, filter, map, Observable, ReplaySubject, switchMap, take, takeUntil } from 'rxjs';
import { selectLikedRecipes, selectLikedRecipesLoaded, selectLoggedInUser } from '../../state/users/users.selectors';
import { IsLikedMap } from '../../interfaces/is-liked-map';
import { Recipe } from '../../interfaces/recipe';
import { selectRecipes, selectRecipesLoaded } from '../../state/recipes/recipes.selectors';
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
  loggedInUser$: Observable<Readonly<User | undefined>> = EMPTY;
  
  likedRecipesSnapshot: ReadonlyArray<Recipe> = [];

  destroyed$: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();
  receivedData$: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();

  isLikedMap: IsLikedMap = {};

  ngOnInit(): void {
    this.likedRecipes$ = this.store.select(selectLikedRecipes).pipe(takeUntil(this.destroyed$));
    this.allRecipes$ = this.store.select(selectRecipes).pipe(takeUntil(this.destroyed$));
    this.loggedInUser$ = this.store.select(selectLoggedInUser).pipe(takeUntil(this.destroyed$));


    // We don't want an observable of recipes because if we did that and press the "unlike" button,
    // the recipe would vanish right away. Instead, we take a snapshot. That way, we can give the user the option to "re-like",
    // if the user pressed "unlike" on accident
    const likesLoaded$: Observable<boolean> = this.store.select(selectLikedRecipesLoaded);
    const recipesLoaded$: Observable<boolean> = this.store.select(selectRecipesLoaded);

    const likesAndRecipesLoaded$: Observable<boolean> = combineLatest([likesLoaded$, recipesLoaded$]).pipe(
      map(([likesLoaded, recipesLoaded]) => likesLoaded && recipesLoaded),
      filter(isLoaded => isLoaded),
      take(1)
    );
    
    likesAndRecipesLoaded$.pipe(
      switchMap(() =>
        combineLatest([this.likedRecipes$, this.allRecipes$]).pipe(
          map(([likes, recipes]) => recipes.filter(recipe => likes.includes(recipe.id))),
          take(1)
        )
      )
    ).subscribe(likedRecipesSnapshot => {this.likedRecipesSnapshot = likedRecipesSnapshot});


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
