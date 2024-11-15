import { Component, inject, input, InputSignal, Signal } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Store } from '@ngrx/store';
import { RecipeActions } from '../../state/recipes/recipes.actions';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alert-type';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  
  store: Store = inject(Store);
  router: Router = inject(Router);
  alertService: AlertService = inject(AlertService);
  
  recipeItem: InputSignal<Recipe> = input.required();

  deleteRecipe(){
    this.store.dispatch(RecipeActions.removeRecipe({ id: this.recipeItem().id}));
    this.alertService.addAlert("Successfully deleted recipe!", AlertType.SUCCESS);
  }

  editRecipe(){
    this.router.navigate(['recipe', this.recipeItem().id, 'edit'])
  }
}
