import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { Store, StoreModule } from '@ngrx/store';
import { RecipeActions } from './state/recipes/recipes.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'recipe-hub';

  constructor(private store: Store){

  }

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.loadRecipes());
  }
}
