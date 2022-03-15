import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionAddComponent } from './prescription-add.component';

describe('PrescriptionAddComponent', () => {
  let component: PrescriptionAddComponent;
  let fixture: ComponentFixture<PrescriptionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
