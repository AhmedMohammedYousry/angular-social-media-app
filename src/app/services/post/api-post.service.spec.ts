import { TestBed } from '@angular/core/testing';

import { ApiPostService } from './api-post.service';

describe('ApiPostService', () => {
  let service: ApiPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
