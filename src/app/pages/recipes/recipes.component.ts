import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { EMPTY, Observable, ReplaySubject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { RecipeActions, RecipeApiActions } from '../../state/recipes/recipes.actions';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { selectRecipes } from '../../state/recipes/recipes.selectors';
import { Router } from '@angular/router';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeCardSectionComponent } from '../../components/recipe-card-section/recipe-card-section.component';
import { InFocusComponent } from '../../components/in-focus/in-focus.component';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { selectLikedRecipes, selectLoggedInUser } from '../../state/users/users.selectors';
import { IsLikedMap } from '../../interfaces/is-liked-map';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [AsyncPipe, RecipeItemComponent, RecipeCardSectionComponent, InFocusComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit, OnDestroy{

  store: Store = inject(Store);
  router: Router = inject(Router);

  allRecipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;
  likedRecipes$: Observable<ReadonlyArray<number>> = EMPTY;
  loggedInUser$: Observable<User | undefined> = EMPTY;
  destroyed$: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();

  isLikedMap: IsLikedMap = {};
  
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
