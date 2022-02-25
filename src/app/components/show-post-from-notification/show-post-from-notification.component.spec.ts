import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPostFromNotificationComponent } from './show-post-from-notification.component';

describe('ShowPostFromNotificationComponent', () => {
  let component: ShowPostFromNotificationComponent;
  let fixture: ComponentFixture<ShowPostFromNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPostFromNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPostFromNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
