import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenThreeComponent } from './screen-three.component';

describe('ScreenThreeComponent', () => {
  let component: ScreenThreeComponent;
  let fixture: ComponentFixture<ScreenThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
