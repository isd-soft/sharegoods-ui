import { TestBed } from '@angular/core/testing';

import { StarService } from './star.service';

describe('StarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarService = TestBed.get(StarService);
    expect(service).toBeTruthy();
  });
});
