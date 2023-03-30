import { TestBed } from '@angular/core/testing';

import { FindAllBudgetCodeService } from './find-all-budget-code.service';

describe('FindAllBudgetCodeService', () => {
  let service: FindAllBudgetCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAllBudgetCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
