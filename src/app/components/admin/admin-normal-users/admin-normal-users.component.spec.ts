import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNormalUsersComponent } from './admin-normal-users.component';

describe('AdminNormalUsersComponent', () => {
  let component: AdminNormalUsersComponent;
  let fixture: ComponentFixture<AdminNormalUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNormalUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNormalUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
