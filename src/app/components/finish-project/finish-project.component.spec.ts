import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishProjectComponent } from './finish-project.component';

describe('FinishProjectComponent', () => {
  let component: FinishProjectComponent;
  let fixture: ComponentFixture<FinishProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
