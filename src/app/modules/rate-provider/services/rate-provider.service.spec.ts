import { TestBed } from '@angular/core/testing';

import { RateProviderService } from './rate-provider.service';

describe('RateProviderService', () => {
  let service: RateProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
