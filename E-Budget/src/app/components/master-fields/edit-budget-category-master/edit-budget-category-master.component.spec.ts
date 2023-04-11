import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBudgetCategoryMasterComponent } from './edit-budget-category-master.component';

describe('EditBudgetCategoryMasterComponent', () => {
  let component: EditBudgetCategoryMasterComponent;
  let fixture: ComponentFixture<EditBudgetCategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBudgetCategoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBudgetCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
