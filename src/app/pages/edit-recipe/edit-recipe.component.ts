import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  ReplaySubject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { Measurement } from '../../interfaces/measurement';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRecipe } from '../../state/recipes/recipes.selectors';
import { RecipeActions } from '../../state/recipes/recipes.actions';
import { AsyncPipe, Location, NgFor } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alert-type';
import { v4 as uuidv4 } from 'uuid'; // Install uuid package if not already

interface FormControlIngredient{
  _id: FormControl<string | null>; 
  name: FormControl<string | null>; 
  amount: FormControl<number | null>;
  measurement: FormControl<Measurement | null>;
}

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, NgFor],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent implements OnInit, OnDestroy{
  
  formBuilder: FormBuilder      = inject(FormBuilder);
  route: ActivatedRoute         = inject(ActivatedRoute);
  store: Store                  = inject(Store);
  location: Location            = inject(Location);
  alertService: AlertService    = inject(AlertService);
  recipeService: RecipeService  = inject(RecipeService);

  destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  measurements$: Observable<Measurement[]> = EMPTY;
  recipe: Readonly<Recipe | undefined> = undefined;

  recipeId: number = -1;

  form: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    ingredients: this.formBuilder.array([]),
    steps: this.formBuilder.array([]),
  });


  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));

    // We don't want to continuously check for the latest updated recipe, because that could override
    // the users inputs. We instead want a snapshot of the recipe
    this.store.select(selectRecipe(this.recipeId)).pipe(take(1)).subscribe((recipe) => {
      this.recipe = recipe; // Snapshot

      this.recipe?.steps.forEach(_ => {
        this.steps.push(this.newStep());
      })

      this.recipe?.ingredients.forEach(_ => {
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
      if(this.recipe){
        const recipe: Recipe = {
          ...this.recipe,
          title: this.form.value.title,
          ingredients: this.form.value.ingredients,
          steps: this.form.value.steps
        };
  
        this.store.dispatch(RecipeActions.updateRecipe({ recipe })) ;
        this.alertService.addAlert("Updated recipe!", AlertType.SUCCESS);
        this.location.back();
      }
    }else{
      this.alertService.addAlert("Could not save recipe!", AlertType.DANGER);
    }
  }

  compareFn(c1: Measurement, c2: Measurement): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  trackById(index: number, item: AbstractControl): string {
    return item.get('_id')?.value;
  }

  // Ingredients
  get ingredients(): FormArray<FormGroup<FormControlIngredient>>{ return this.form.get('ingredients') as FormArray }
  addIngredient(): void { this.ingredients.push(this.newIngredient()) }
  removeIngredient(index: number): void { this.ingredients.removeAt(index) }

  newIngredient(): FormGroup<FormControlIngredient>{
    return this.formBuilder.group({
      _id: [uuidv4()],  // Used for tracking
      name: ['', Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]],
      measurement: [null as Measurement | null, Validators.required]
    })
  }

  // Steps
  get steps(): FormArray<FormControl>{ return this.form.get('steps') as FormArray };
  addStep(): void{this.steps.push(this.newStep())};
  removeStep(index: number): void { this.steps.removeAt(index) };
  newStep(): FormControl { return this.formBuilder.control("") };

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
