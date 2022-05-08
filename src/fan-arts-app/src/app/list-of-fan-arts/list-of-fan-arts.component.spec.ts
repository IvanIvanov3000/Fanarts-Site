import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFanArtsComponent } from './list-of-fan-arts.component';

describe('ListOfFanArtsComponent', () => {
  let component: ListOfFanArtsComponent;
  let fixture: ComponentFixture<ListOfFanArtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfFanArtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFanArtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
