import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSubCategoryMasterComponent } from './budget-sub-category-master.component';

describe('BudgetSubCategoryMasterComponent', () => {
  let component: BudgetSubCategoryMasterComponent;
  let fixture: ComponentFixture<BudgetSubCategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetSubCategoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSubCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
