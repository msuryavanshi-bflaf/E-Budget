import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCategoryMasterComponent } from './budget-category-master.component';

describe('BudgetCategoryMasterComponent', () => {
  let component: BudgetCategoryMasterComponent;
  let fixture: ComponentFixture<BudgetCategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetCategoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
