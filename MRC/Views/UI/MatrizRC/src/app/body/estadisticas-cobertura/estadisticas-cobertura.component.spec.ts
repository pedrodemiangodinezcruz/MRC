import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasCoberturaComponent } from './estadisticas-cobertura.component';

describe('EstadisticasCoberturaComponent', () => {
  let component: EstadisticasCoberturaComponent;
  let fixture: ComponentFixture<EstadisticasCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasCoberturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
