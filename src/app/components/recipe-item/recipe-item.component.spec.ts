import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemComponent } from './recipe-item.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeItemComponent],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("recipeItem",{
      "title": "Spaghetti Bolognese",
      "id": 1,
      "ingredients": [
          {
              "name": "Spaghetti",
              "amount": 200,
              "measurement": {
                  "id": 1,
                  "measurementType": "WEIGHT",
                  "label": "grams"
              }
          },
          {
              "name": "Ground Beef",
              "amount": 300,
              "measurement": {
                  "id": 2,
                  "measurementType": "WEIGHT",
                  "label": "grams"
              }
          },
          {
              "name": "Tomato Sauce",
              "amount": 150,
              "measurement": {
                  "id": 3,
                  "measurementType": "WEIGHT",
                  "label": "grams"
              }
          },
          {
              "name": "Onion",
              "amount": 1,
              "measurement": {
                  "id": 4,
                  "measurementType": "PIECE",
                  "label": "pieces"
              }
          },
          {
              "name": "Garlic",
              "amount": 2,
              "measurement": {
                  "id": 5,
                  "measurementType": "PIECE",
                  "label": "pieces"
              }
          }
      ],
      "steps": [
          {
              "shortText": "Cook pasta",
              "longText": "Boil water in a pot, add salt, and cook the spaghetti until al dente."
          },
          {
              "shortText": "Prepare sauce",
              "longText": "In a pan, sauté onions and garlic, then add ground beef and cook until browned. Add tomato sauce and simmer."
          },
          {
              "shortText": "Combine",
              "longText": "Mix the cooked spaghetti with the sauce and serve hot."
          }
      ]
  })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
