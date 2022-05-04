import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaResidualComponent } from './mapa-residual.component';

describe('MapaResidualComponent', () => {
  let component: MapaResidualComponent;
  let fixture: ComponentFixture<MapaResidualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaResidualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaResidualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
