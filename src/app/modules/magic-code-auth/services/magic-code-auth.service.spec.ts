import { TestBed } from '@angular/core/testing';

import { MagicCodeAuthService } from './magic-code-auth.service';

describe('MagicCodeAuthService', () => {
  let service: MagicCodeAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicCodeAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
