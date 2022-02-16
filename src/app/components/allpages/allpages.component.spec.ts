import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpagesComponent } from './allpages.component';

describe('AllpagesComponent', () => {
  let component: AllpagesComponent;
  let fixture: ComponentFixture<AllpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
