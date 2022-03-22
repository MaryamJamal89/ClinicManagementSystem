import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentDoctorComponent } from './add-appointment-doctor.component';

describe('AddAppointmentDoctorComponent', () => {
  let component: AddAppointmentDoctorComponent;
  let fixture: ComponentFixture<AddAppointmentDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppointmentDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppointmentDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
