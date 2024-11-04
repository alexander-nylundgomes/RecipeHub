import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipeComponent } from './edit-recipe.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

const mockActivatedRoute = {
  paramMap: of({
    get: (key: string) => (key === 'id' ? '1' : null)
  })
} as ActivatedRoute

describe('EditRecipeComponent', () => {
  let component: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecipeComponent],
      providers: [
        provideMockStore(),
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
