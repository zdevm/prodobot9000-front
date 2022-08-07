import { TestBed } from '@angular/core/testing';

import { ProductRateService } from './product-rate.service';

describe('ProductRateService', () => {
  let service: ProductRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
