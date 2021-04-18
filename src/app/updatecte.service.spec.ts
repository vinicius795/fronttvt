import { TestBed } from '@angular/core/testing';

import { UpdatecteService } from './updatecte.service';

describe('UpdatecteService', () => {
  let service: UpdatecteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatecteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
