import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectajudanteComponent } from './selectajudante.component';

describe('SelectajudanteComponent', () => {
  let component: SelectajudanteComponent;
  let fixture: ComponentFixture<SelectajudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectajudanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectajudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
