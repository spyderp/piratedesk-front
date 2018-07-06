import { TestBed, inject } from '@angular/core/testing';

import { KnowledgeService } from './knowledge.service';

describe('KnowledgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnowledgeService]
    });
  });

  it('should be created', inject([KnowledgeService], (service: KnowledgeService) => {
    expect(service).toBeTruthy();
  }));
});
