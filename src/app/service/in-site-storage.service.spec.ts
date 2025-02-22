import { TestBed } from '@angular/core/testing';

import { InSiteStorageService } from './in-site-storage.service';

describe('InSiteStorageService', () => {
  let service: InSiteStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InSiteStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
