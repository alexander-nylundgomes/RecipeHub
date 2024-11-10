import { Component, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';
import { AsyncPipe } from '@angular/common';
import { EMPTY, map, Observable, ReplaySubject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLikedRecipes } from '../../state/users/users.selectors';
import { UserActions } from '../../state/users/users.actions';

type Sizes = "S" | "M" | "L" | "FLUID";

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent implements OnDestroy{

  // Injects
  router: Router = inject(Router);
  store: Store = inject(Store);

  // Inputs
  size: InputSignal<Sizes> = input<Sizes>("M");
  recipe: InputSignal<Recipe> = input.required();
  isLiked: InputSignal<Boolean> = input.required();
  
  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    

  toggleLike(){
    if(this.isLiked()){
      this.store.dispatch(UserActions.unlikeRecipe({ recipeId: this.recipe().id }))
    }else{
      this.store.dispatch(UserActions.likeRecipe({ recipeId: this.recipe().id }))
    }
  }

  navigateToRecipe(){
    this.router.navigate(['recipe', 1])
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
