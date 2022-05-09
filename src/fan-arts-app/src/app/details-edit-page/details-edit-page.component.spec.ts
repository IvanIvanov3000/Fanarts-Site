import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEditPageComponent } from './details-edit-page.component';

describe('DetailsEditPageComponent', () => {
  let component: DetailsEditPageComponent;
  let fixture: ComponentFixture<DetailsEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
