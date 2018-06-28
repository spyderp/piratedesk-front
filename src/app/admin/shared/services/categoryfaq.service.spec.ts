import { TestBed, inject } from '@angular/core/testing';

import { CategoryfaqService } from './categoryfaq.service';

describe('CategoryfaqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryfaqService]
    });
  });

  it('should be created', inject([CategoryfaqService], (service: CategoryfaqService) => {
    expect(service).toBeTruthy();
  }));
});
