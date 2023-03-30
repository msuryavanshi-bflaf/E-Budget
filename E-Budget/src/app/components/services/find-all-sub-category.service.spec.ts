import { TestBed } from '@angular/core/testing';

import { FindAllSubCategoryService } from './find-all-sub-category.service';

describe('FindAllSubCategoryService', () => {
  let service: FindAllSubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAllSubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
