import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  constructor(
    private router: Router
  ){} 

  navigateToRecipe(){
    this.router.navigate(['recipe', 1])
  }
}
