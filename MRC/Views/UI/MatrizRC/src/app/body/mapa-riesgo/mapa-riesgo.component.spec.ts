import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaRiesgoComponent } from './mapa-riesgo.component';

describe('MapaRiesgoComponent', () => {
  let component: MapaRiesgoComponent;
  let fixture: ComponentFixture<MapaRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
