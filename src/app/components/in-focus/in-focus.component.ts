import { Component, inject, input, InputSignal } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-in-focus',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './in-focus.component.html',
  styleUrl: './in-focus.component.scss'
})
export class InFocusComponent {
  
  // Injects
  router: Router = inject(Router);
  
  // Inputs
  recipe: InputSignal<Recipe | undefined> = input.required();

  checkOut(){
    this.router.navigate(['recipe', 11])
  }
}
