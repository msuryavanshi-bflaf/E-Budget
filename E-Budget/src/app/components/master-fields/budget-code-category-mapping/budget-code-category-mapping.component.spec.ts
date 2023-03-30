import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCodeCategoryMappingComponent } from './budget-code-category-mapping.component';

describe('BudgetCodeCategoryMappingComponent', () => {
  let component: BudgetCodeCategoryMappingComponent;
  let fixture: ComponentFixture<BudgetCodeCategoryMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetCodeCategoryMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCodeCategoryMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
