import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardSectionComponent } from './recipe-card-section.component';

describe('RecipeCardSectionComponent', () => {
  let component: RecipeCardSectionComponent;
  let fixture: ComponentFixture<RecipeCardSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
