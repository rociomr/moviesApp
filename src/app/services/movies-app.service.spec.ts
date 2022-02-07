import { TestBed } from '@angular/core/testing';

import { MoviesAppService } from './movies-app.service';

describe('MoviesAppService', () => {
  let service: MoviesAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
