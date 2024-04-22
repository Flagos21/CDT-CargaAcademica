import { TestBed } from '@angular/core/testing';

import { CrearCargadocenteService } from './cargadocente.service';

describe('CrearCargadocenteService', () => {
  let service: CrearCargadocenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearCargadocenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
