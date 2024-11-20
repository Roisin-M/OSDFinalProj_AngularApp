import { TestBed } from '@angular/core/testing';

import { ClassLocationsService } from './class-locations.service';

describe('ClassLocationsService', () => {
  let service: ClassLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
