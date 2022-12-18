import { TestBed } from '@angular/core/testing';

import { FanArtsService } from './fan-arts.service';

describe('FanArtsService', () => {
  let service: FanArtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FanArtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
