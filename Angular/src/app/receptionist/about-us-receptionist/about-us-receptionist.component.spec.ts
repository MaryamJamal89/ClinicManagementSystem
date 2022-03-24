import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsReceptionistComponent } from './about-us-receptionist.component';

describe('AboutUsReceptionistComponent', () => {
  let component: AboutUsReceptionistComponent;
  let fixture: ComponentFixture<AboutUsReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
