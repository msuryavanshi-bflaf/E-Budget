import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCategoryViewComponent } from './budget-category-view.component';

describe('BudgetCategoryViewComponent', () => {
  let component: BudgetCategoryViewComponent;
  let fixture: ComponentFixture<BudgetCategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetCategoryViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BudgetCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
