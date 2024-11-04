import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { Store, StoreModule } from '@ngrx/store';
import { RecipeActions } from './state/recipes/recipes.actions';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, FooterComponent, HeaderComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'recipe-hub';

  constructor(
    private store: Store,
    public alertService: AlertService
  ){}

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.loadRecipes());
  }
}
