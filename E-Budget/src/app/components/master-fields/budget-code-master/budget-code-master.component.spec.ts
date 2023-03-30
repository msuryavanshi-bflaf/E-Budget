import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCodeMasterComponent } from './budget-code-master.component';

describe('BudgetCodeMasterComponent', () => {
  let component: BudgetCodeMasterComponent;
  let fixture: ComponentFixture<BudgetCodeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetCodeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCodeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
