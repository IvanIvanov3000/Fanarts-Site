import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanArtComponent } from './fan-art.component';

describe('FanArtComponent', () => {
  let component: FanArtComponent;
  let fixture: ComponentFixture<FanArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanArtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FanArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
