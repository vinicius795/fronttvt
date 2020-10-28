import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectveiculoComponent } from './selectveiculo.component';

describe('SelectveiculoComponent', () => {
  let component: SelectveiculoComponent;
  let fixture: ComponentFixture<SelectveiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectveiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectveiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
