import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCausaComponent } from './tabla-causa.component';

describe('TablaCausaComponent', () => {
  let component: TablaCausaComponent;
  let fixture: ComponentFixture<TablaCausaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaCausaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCausaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
