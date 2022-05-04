import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParetoComponent } from './pareto.component';

describe('ParetoComponent', () => {
  let component: ParetoComponent;
  let fixture: ComponentFixture<ParetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParetoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
