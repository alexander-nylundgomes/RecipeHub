import { Component, inject, OnInit } from '@angular/core';
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
import { Recipe } from '../../interfaces/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRecipe } from '../../state/recipes/recipes.selectors';
import { RecipeActions } from '../../state/recipes/recipes.actions';
import { AsyncPipe, Location } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alert-type';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent implements OnInit {
  
  formBuilder: FormBuilder      = inject(FormBuilder);
  route: ActivatedRoute         = inject(ActivatedRoute);
  store: Store                  = inject(Store);
  router: Router                = inject(Router);
  location: Location            = inject(Location);
  alertService: AlertService    = inject(AlertService);
  recipeService: RecipeService  = inject(RecipeService);

  destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  measurements$: Observable<Measurement[]> = EMPTY;
  recipe$: Observable<Readonly<Recipe | undefined>> = EMPTY;

  recipeId: number | null = null;

  form: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    ingredients: this.formBuilder.array([]),
    steps: this.formBuilder.array([]),
  });


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

  addIngredient(){
    this.ingredients.push(this.newIngredient())
  }

  removeIngredient(index: number){
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.recipe$.pipe(take(1)).subscribe((recipe) => {
        if (recipe) {

          const updatedRecipe = this.form.value;
          updatedRecipe.id = this.recipeId;
          this.store.dispatch(RecipeActions.updateRecipe({ recipe: updatedRecipe })) ;
          this.alertService.addAlert("Updated recipe!", AlertType.SUCCESS);
          this.router.navigate(["recipe", this.recipeId]);
        }else{
          this.alertService.addAlert("Could not save recipe!", AlertType.DANGER);
        }
      });
    }else{
      this.alertService.addAlert("Could not save recipe!", AlertType.DANGER);
    }
  }

  compareFn(c1: Measurement, c2: Measurement): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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
