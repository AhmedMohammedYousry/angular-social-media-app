import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatPageComponent } from './creat-page.component';

describe('CreatPageComponent', () => {
  let component: CreatPageComponent;
  let fixture: ComponentFixture<CreatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
