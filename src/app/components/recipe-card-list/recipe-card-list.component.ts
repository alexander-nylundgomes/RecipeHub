import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-card-list',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './recipe-card-list.component.html',
  styleUrl: './recipe-card-list.component.scss'
})
export class RecipeCardListComponent {

}
