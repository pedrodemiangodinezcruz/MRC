import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriosComponent } from './criterios.component';

describe('CriteriosComponent', () => {
  let component: CriteriosComponent;
  let fixture: ComponentFixture<CriteriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
