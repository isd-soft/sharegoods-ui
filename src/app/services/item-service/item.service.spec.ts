import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemsService = TestBed.get(ItemsService);
    expect(service).toBeTruthy();
  });
});
