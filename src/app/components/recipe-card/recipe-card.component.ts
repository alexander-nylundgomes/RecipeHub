import { Component, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';
import { AsyncPipe } from '@angular/common';
import { EMPTY, map, Observable, ReplaySubject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLikedRecipes } from '../../state/users/users.selectors';
import { UserActions } from '../../state/users/users.actions';
import { RecipeActions } from '../../state/recipes/recipes.actions';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alert-type';

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
  alertService: AlertService = inject(AlertService);

  // Inputs
  size: InputSignal<Sizes> = input<Sizes>("M");
  recipe: InputSignal<Recipe> = input.required();
  isLiked: InputSignal<boolean> = input.required();
  editable: InputSignal<boolean> = input(false);

  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    

  toggleLike(){
    if(this.isLiked()){
      this.store.dispatch(UserActions.unlikeRecipe({ recipeId: this.recipe().id }))
    }else{
      this.store.dispatch(UserActions.likeRecipe({ recipeId: this.recipe().id }))
    }
  }

  editRecipe(){
    this.router.navigate(['recipe', this.recipe().id, 'edit'])
  }

  deleteRecipe(){
    this.store.dispatch(RecipeActions.removeRecipe({ id: this.recipe().id }));
    this.alertService.addAlert("Recipe was deleted!", AlertType.SUCCESS)
  }

  navigateToRecipe(){
    this.router.navigate(['recipe', this.recipe().id])
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
