import { TestBed } from '@angular/core/testing';

import { FindAllBudgetCategoryNameService } from './find-all-budget-category-name.service';

describe('FindAllBudgetCategoryNameService', () => {
  let service: FindAllBudgetCategoryNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAllBudgetCategoryNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
