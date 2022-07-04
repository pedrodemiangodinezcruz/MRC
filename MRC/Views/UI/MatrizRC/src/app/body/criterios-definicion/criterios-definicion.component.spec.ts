import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriosDefinicionComponent } from './criterios-definicion.component';

describe('CriteriosDefinicionComponent', () => {
  let component: CriteriosDefinicionComponent;
  let fixture: ComponentFixture<CriteriosDefinicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriosDefinicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriosDefinicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
