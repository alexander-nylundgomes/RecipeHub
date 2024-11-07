import { Component, input, InputSignal } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-card-section',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './recipe-card-section.component.html',
  styleUrl: './recipe-card-section.component.scss'
})
export class RecipeCardSectionComponent {

  title: InputSignal<String> = input.required();
}
