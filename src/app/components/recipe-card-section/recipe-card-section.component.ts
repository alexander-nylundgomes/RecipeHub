import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe } from '../../interfaces/recipe';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-card-section',
  standalone: true,
  imports: [RecipeCardComponent, AsyncPipe],
  templateUrl: './recipe-card-section.component.html',
  styleUrl: './recipe-card-section.component.scss'
})
export class RecipeCardSectionComponent {

  title: InputSignal<String> = input.required();
  recipes: InputSignal<Observable<ReadonlyArray<Recipe>>> = input.required();

  @Output() onNavigateTo: EventEmitter<void> = new EventEmitter();
}
