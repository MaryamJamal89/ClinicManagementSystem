import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHeaderSideformComponent } from './doctor-header-sideform.component';

describe('DoctorHeaderSideformComponent', () => {
  let component: DoctorHeaderSideformComponent;
  let fixture: ComponentFixture<DoctorHeaderSideformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorHeaderSideformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorHeaderSideformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
