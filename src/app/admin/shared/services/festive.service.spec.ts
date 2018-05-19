import { TestBed, inject } from '@angular/core/testing';

import { FestiveService } from './festive.service';

describe('FestiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FestiveService]
    });
  });

  it('should be created', inject([FestiveService], (service: FestiveService) => {
    expect(service).toBeTruthy();
  }));
});
