import { TestBed } from '@angular/core/testing';

import { PianosService } from './pianos.service';

describe('PianosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PianosService = TestBed.get(PianosService);
    expect(service).toBeTruthy();
  });
});
