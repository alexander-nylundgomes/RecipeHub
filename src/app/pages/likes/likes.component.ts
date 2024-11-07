import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeCardListComponent } from '../../components/recipe-card-list/recipe-card-list.component';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [RecipeCardComponent, RecipeCardListComponent],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss'
})
export class LikesComponent {

}
