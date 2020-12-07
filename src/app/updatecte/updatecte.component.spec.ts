import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecteComponent } from './updatecte.component';

describe('UpdatecteComponent', () => {
  let component: UpdatecteComponent;
  let fixture: ComponentFixture<UpdatecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
