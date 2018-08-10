import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryScreenOneComponent } from './category-screen-one.component';

describe('CategoryScreenOneComponent', () => {
  let component: CategoryScreenOneComponent;
  let fixture: ComponentFixture<CategoryScreenOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryScreenOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryScreenOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
