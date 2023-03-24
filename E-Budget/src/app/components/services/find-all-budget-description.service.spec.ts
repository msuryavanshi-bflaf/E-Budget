import { TestBed } from '@angular/core/testing';

import { FindAllBudgetDescriptionService } from './find-all-budget-description.service';

describe('FindAllBudgetDescriptionService', () => {
  let service: FindAllBudgetDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAllBudgetDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
