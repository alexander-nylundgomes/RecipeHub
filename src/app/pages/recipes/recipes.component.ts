import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { EMPTY, Observable, ReplaySubject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { RecipeActions, RecipeApiActions } from '../../state/recipes/recipes.actions';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { selectLikedRecipes, selectRecipes } from '../../state/recipes/recipes.selectors';
import { Router } from '@angular/router';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeCardSectionComponent } from '../../components/recipe-card-section/recipe-card-section.component';
import { InFocusComponent } from '../../components/in-focus/in-focus.component';
import { UserService } from '../../services/user.service';

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
  userService: UserService = inject(UserService);

  allRecipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;
  likedRecipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;
  
  destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  ngOnInit(): void {
    this.allRecipes$ = this.store.select(selectRecipes);
    this.likedRecipes$ = this.store.select(selectLikedRecipes());
  }

  navigateToSection(key: string){

  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
