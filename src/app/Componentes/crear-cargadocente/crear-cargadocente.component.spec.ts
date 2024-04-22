import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCargadocenteComponent } from './crear-cargadocente.component';

describe('CrearCargadocenteComponent', () => {
  let component: CrearCargadocenteComponent;
  let fixture: ComponentFixture<CrearCargadocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCargadocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearCargadocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
