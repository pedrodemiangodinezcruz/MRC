import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRiesgoComponent } from './control-riesgo.component';

describe('ControlRiesgoComponent', () => {
  let component: ControlRiesgoComponent;
  let fixture: ComponentFixture<ControlRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
