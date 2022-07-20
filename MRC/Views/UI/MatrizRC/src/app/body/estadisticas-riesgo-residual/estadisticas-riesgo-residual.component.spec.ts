import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasRiesgoResidualComponent } from './estadisticas-riesgo-residual.component';

describe('EstadisticasRiesgoResidualComponent', () => {
  let component: EstadisticasRiesgoResidualComponent;
  let fixture: ComponentFixture<EstadisticasRiesgoResidualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasRiesgoResidualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasRiesgoResidualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
