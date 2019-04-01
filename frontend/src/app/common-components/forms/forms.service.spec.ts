import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms.service.';

describe('RegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormsService = TestBed.get(FormsService);
    expect(service).toBeTruthy();
  });
});
