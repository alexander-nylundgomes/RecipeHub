import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeComponent } from './recipe.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';



const mockActivatedRoute = {
  paramMap: of({
    get: (key: string) => (key === 'id' ? '1' : null)
  })
} as Partial<ActivatedRoute> as ActivatedRoute;


describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeComponent],
      providers: [
        provideMockStore(), 
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
