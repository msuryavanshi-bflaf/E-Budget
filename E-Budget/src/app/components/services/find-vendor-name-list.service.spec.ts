import { TestBed } from '@angular/core/testing';

import { FindVendorNameListService } from './find-vendor-name-list.service';

describe('FindVendorNameListService', () => {
  let service: FindVendorNameListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindVendorNameListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
