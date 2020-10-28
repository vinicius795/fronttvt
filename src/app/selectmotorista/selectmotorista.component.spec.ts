import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectmotoristaComponent } from './selectmotorista.component';

describe('SelectmotoristaComponent', () => {
  let component: SelectmotoristaComponent;
  let fixture: ComponentFixture<SelectmotoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectmotoristaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectmotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
