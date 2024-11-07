import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, Observable, ReplaySubject, Subject, switchMap, take, takeUntil } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe';
import { selectRecipe } from '../../state/recipes/recipes.selectors';
import { AsyncPipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeActions } from '../../state/recipes/recipes.actions';
import { RecipeStep } from '../../interfaces/recipe-step';
import { RecipeService } from '../../services/recipe.service';
import { Measurement } from '../../interfaces/measurement';
import { AvatarComponent } from '../../components/avatar/avatar.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [AsyncPipe, AvatarComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit, OnDestroy{

  destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  recipe$: Observable<Readonly<Recipe | undefined>> = EMPTY;
  measurements$: Observable<Measurement[]> = EMPTY;

  recipeId: number | null = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public router: Router,
    private recipesService: RecipeService,
    public location: Location
  ){}

  ngOnInit(): void {
    this.recipe$ = this.route.paramMap.pipe(switchMap(params => {
      this.recipeId = Number(params.get('id'));
      return this.store.select(selectRecipe(this.recipeId))
    }))

    this.measurements$ = this.recipesService.getMeasurements().pipe(takeUntil(this.destroyed$));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
