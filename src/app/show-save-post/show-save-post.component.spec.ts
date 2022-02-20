import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSavePostComponent } from './show-save-post.component';

describe('ShowSavePostComponent', () => {
  let component: ShowSavePostComponent;
  let fixture: ComponentFixture<ShowSavePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSavePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSavePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
