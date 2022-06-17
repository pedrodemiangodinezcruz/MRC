import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRiesgosComponent } from './lista-riesgos.component';

describe('ListaRiesgosComponent', () => {
  let component: ListaRiesgosComponent;
  let fixture: ComponentFixture<ListaRiesgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRiesgosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRiesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
