import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { Store, StoreModule } from '@ngrx/store';
import { RecipeActions } from './state/recipes/recipes.actions';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { UserActions } from './state/users/users.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, FooterComponent, HeaderComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'recipe-hub';

  store: Store = inject(Store);
  alertService: AlertService = inject(AlertService);

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.loadRecipes());
    this.store.dispatch(UserActions.loadUser());
    this.store.dispatch(UserActions.loadFollowsUsers());
    this.store.dispatch(UserActions.loadLikedRecipes());
  }
}
