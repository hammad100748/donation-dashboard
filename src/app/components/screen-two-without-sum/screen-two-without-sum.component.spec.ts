import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTwoWithoutSumComponent } from './screen-two-without-sum.component';

describe('ScreenTwoWithoutSumComponent', () => {
  let component: ScreenTwoWithoutSumComponent;
  let fixture: ComponentFixture<ScreenTwoWithoutSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenTwoWithoutSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenTwoWithoutSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
