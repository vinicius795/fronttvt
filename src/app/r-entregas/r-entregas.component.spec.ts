import { ComponentFixture, TestBed } from '@angular/core/testing';

import { REntregasComponent } from './r-entregas.component';

describe('REntregasComponent', () => {
  let component: REntregasComponent;
  let fixture: ComponentFixture<REntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ REntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(REntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
