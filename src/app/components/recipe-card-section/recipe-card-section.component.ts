import { Component, EventEmitter, Input, input, InputSignal, Output } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe } from '../../interfaces/recipe';
import { IsLikedMap } from '../../interfaces/is-liked-map';

@Component({
  selector: 'app-recipe-card-section',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './recipe-card-section.component.html',
  styleUrl: './recipe-card-section.component.scss'
})
export class RecipeCardSectionComponent {

  readonly MAX_SHOWING_LENGTH: number = 8;

  title: InputSignal<String> = input.required();
  recipes: InputSignal<ReadonlyArray<Recipe>> = input.required();
  likes: InputSignal<IsLikedMap> = input.required();


  // We could inject our userService here and listen to what the logged in user
  // is, but it's better to do it in the page component because of performance
  loggedInUserId: InputSignal<number> = input.required();

  @Output() onNavigateTo: EventEmitter<void> = new EventEmitter();
}
