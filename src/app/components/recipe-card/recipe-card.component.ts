import { Component, inject, input, InputSignal } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';

type Sizes = "S" | "M" | "L" | "FLUID";

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  // Injects
  router: Router = inject(Router);

  // Inputs
  size: InputSignal<Sizes> = input<Sizes>("M");
  recipe: InputSignal<Recipe> = input.required();

  navigateToRecipe(){
    this.router.navigate(['recipe', 1])
  }
}
