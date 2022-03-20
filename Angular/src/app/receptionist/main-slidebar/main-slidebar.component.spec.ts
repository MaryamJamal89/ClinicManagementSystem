import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSlidebarComponent } from './main-slidebar.component';

describe('MainSlidebarComponent', () => {
  let component: MainSlidebarComponent;
  let fixture: ComponentFixture<MainSlidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSlidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSlidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
