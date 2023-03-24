import { TestBed } from '@angular/core/testing';

import { BudgetCreationService } from './budget-category.service';

describe('BudgetCreationService', () => {
  let service: BudgetCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
