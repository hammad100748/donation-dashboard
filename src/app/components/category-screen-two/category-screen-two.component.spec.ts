import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryScreenTwoComponent } from './category-screen-two.component';

describe('CategoryScreenTwoComponent', () => {
  let component: CategoryScreenTwoComponent;
  let fixture: ComponentFixture<CategoryScreenTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryScreenTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryScreenTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
