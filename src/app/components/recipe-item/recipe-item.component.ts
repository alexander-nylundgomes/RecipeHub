import { Component, input, InputSignal, Signal } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Store } from '@ngrx/store';
import { RecipeActions } from '../../state/recipes/recipes.actions';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  recipeItem: InputSignal<Recipe> = input.required();
  
  constructor(private store: Store){

  }

  deleteRecipe(){
    this.store.dispatch(RecipeActions.removeRecipe({ id: this.recipeItem().id}));
  }

  editRecipe(){

  }
}
