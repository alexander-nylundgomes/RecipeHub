import { Component, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  ReplaySubject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { Measurement } from '../../interfaces/measurement';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient';
import { Recipe } from '../../interfaces/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRecipe } from '../../state/recipes/recipes.selectors';
import { RecipeActions } from '../../state/recipes/recipes.actions';
import { AsyncPipe, Location } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent implements OnInit {
  destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  measurements$: Observable<Measurement[]> = EMPTY;
  recipe$: Observable<Readonly<Recipe | undefined>> = EMPTY;

  recipeId: number | null = null;

  form: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    ingredients: this.formBuilder.array([]),
    steps: this.formBuilder.array([]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    public router: Router,
    public location: Location,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipe$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.recipeId = Number(params.get('id'));
        return this.store.select(selectRecipe(this.recipeId));
      })
    );

    this.recipe$.pipe(take(1)).subscribe((recipe) => {
      recipe?.steps.forEach(_ => {
        this.steps.push(this.newStep());
      })

      recipe?.ingredients.forEach(_ => {
        this.ingredients.push(this.newIngredient())
      })

      this.form.patchValue({ 
        title: recipe?.title,
        ingredients: recipe?.ingredients,
        steps: recipe?.steps
      });
    });

    this.measurements$ = this.recipeService.getMeasurements().pipe(takeUntil(this.destroyed$));
  }


  onSubmit() {
    if (this.form.valid) {
      this.recipe$.pipe(take(1)).subscribe((recipe) => {
        if (recipe) {
          this.store.dispatch(RecipeActions.updateRecipe({ recipe: this.form.value }));
        }
      });
    }else{
      
    }
  }


  // Ingredients ------
  get ingredients(): FormArray{
    return this.form.get('ingredients') as FormArray;
  }

  newIngredient(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]],
      measurement: ['', Validators.required]
    })
  }

  // Steps ------
  get steps(): FormArray{
    return this.form.get('steps') as FormArray;
  }

  newStep(){
    return this.formBuilder.group({
      longText: ['', Validators.required],
      shortText: ['', Validators.required],
    })
  }

}
