import { Component, inject, input, InputSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-in-focus',
  standalone: true,
  imports: [],
  templateUrl: './in-focus.component.html',
  styleUrl: './in-focus.component.scss'
})
export class InFocusComponent {
  
  router: Router = inject(Router);
  recipe: InputSignal<Recipe | undefined> = input.required();

  checkOut(){
    this.router.navigate(['recipe', 11])
  }
}
