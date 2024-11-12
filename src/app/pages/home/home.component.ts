import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { EMPTY, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { selectRecipe, selectRecipes } from '../../state/recipes/recipes.selectors';
import { Router } from '@angular/router';
import { RecipeCardSectionComponent } from '../../components/recipe-card-section/recipe-card-section.component';
import { InFocusComponent } from '../../components/in-focus/in-focus.component';
import { User } from '../../interfaces/user';
import { selectLikedRecipes, selectLoggedInUser } from '../../state/users/users.selectors';
import { IsLikedMap } from '../../interfaces/is-liked-map';
import { AvatarComponent } from '../../components/avatar/avatar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, RecipeCardSectionComponent, InFocusComponent, AvatarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  store: Store = inject(Store);
  router: Router = inject(Router);

  allRecipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;
  likedRecipes$: Observable<ReadonlyArray<number>> = EMPTY;
  loggedInUser$: Observable<User | undefined> = EMPTY;
  inFocusRecipe$: Observable<Readonly<Recipe | undefined>> = EMPTY;

  destroyed$: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();
  
  isLikedMap: IsLikedMap = {};
  
  ngOnInit(): void {
    this.allRecipes$ = this.store.select(selectRecipes).pipe(takeUntil(this.destroyed$));
    this.likedRecipes$ = this.store.select(selectLikedRecipes).pipe(takeUntil(this.destroyed$));
    this.loggedInUser$ = this.store.select(selectLoggedInUser).pipe(takeUntil(this.destroyed$));
    this.inFocusRecipe$ = this.store.select(selectRecipe(11)).pipe(takeUntil(this.destroyed$));

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
