import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintREntregasComponent } from './print-r-entregas.component';

describe('PrintREntregasComponent', () => {
  let component: PrintREntregasComponent;
  let fixture: ComponentFixture<PrintREntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintREntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintREntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
