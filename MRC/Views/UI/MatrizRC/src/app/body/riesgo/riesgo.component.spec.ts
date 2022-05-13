import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgoComponent } from './riesgo.component';

describe('RiesgoComponent', () => {
  let component: RiesgoComponent;
  let fixture: ComponentFixture<RiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
