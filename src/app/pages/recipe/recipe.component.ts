import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, EMPTY, map, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Recipe } from '../../interfaces/recipe';
import { selectRecipe } from '../../state/recipes/recipes.selectors';
import { AsyncPipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeActions } from '../../state/recipes/recipes.actions';
import { RecipeService } from '../../services/recipe.service';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { User } from '../../interfaces/user';
import { selectLoggedInUser } from '../../state/users/users.selectors';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alert-type';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [AsyncPipe, AvatarComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit, OnDestroy{

  store: Store = inject(Store);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  recipesService: RecipeService = inject(RecipeService);
  location: Location = inject(Location);
  alertService: AlertService = inject(AlertService);

  destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  recipe$: Observable<Readonly<Recipe | undefined>> = EMPTY;
  editable$: Observable<boolean> = EMPTY;
  loggedInUser$: Observable<User | undefined> = EMPTY;

  recipeId: number = -1;
  servings: number = 2;

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get("id"));

    this.loggedInUser$ = this.store.select(selectLoggedInUser).pipe(takeUntil(this.destroyed$));
    this.recipe$ = this.store.select(selectRecipe(this.recipeId)).pipe(takeUntil(this.destroyed$))

    this.editable$ = combineLatest([this.recipe$, this.loggedInUser$]).pipe(
      takeUntil(this.destroyed$), 
      map(([recipe, loggedInUser]) => recipe?.createdBy.id === loggedInUser?.id))
  }

  editRecipe(){
    this.router.navigate(['recipe', this.recipeId, 'edit']);
  }

  deleteRecipe(){
    this.store.dispatch(RecipeActions.removeRecipe({ id: this.recipeId }));
    this.alertService.addAlert('Recipe was deleted!', AlertType.SUCCESS);
    this.location.back();
  }

  incrementServings(){
    this.servings += 1;
  }

  decrementServings(){
    this.servings = Math.max(this.servings - 1, 0)
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
