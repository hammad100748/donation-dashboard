import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTwoSumComponent } from './screen-two-sum.component';

describe('ScreenTwoSumComponent', () => {
  let component: ScreenTwoSumComponent;
  let fixture: ComponentFixture<ScreenTwoSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenTwoSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenTwoSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
