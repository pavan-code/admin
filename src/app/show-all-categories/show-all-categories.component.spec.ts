import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllCategoriesComponent } from './show-all-categories.component';

describe('ShowAllCategoriesComponent', () => {
  let component: ShowAllCategoriesComponent;
  let fixture: ComponentFixture<ShowAllCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
