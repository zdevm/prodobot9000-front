import { TestBed } from '@angular/core/testing';

import { ExternalEventService } from './external-event.service';

describe('ExternalEventService', () => {
  let service: ExternalEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
