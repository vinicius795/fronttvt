import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedcteComponent } from './delayedcte.component';

describe('DelayedcteComponent', () => {
  let component: DelayedcteComponent;
  let fixture: ComponentFixture<DelayedcteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelayedcteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayedcteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
