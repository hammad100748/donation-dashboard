import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenOneComponent } from './screen-one.component';

describe('ScreenOneComponent', () => {
  let component: ScreenOneComponent;
  let fixture: ComponentFixture<ScreenOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
