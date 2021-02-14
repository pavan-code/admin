import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurAllProductsComponent } from './our-all-products.component';

describe('OurAllProductsComponent', () => {
  let component: OurAllProductsComponent;
  let fixture: ComponentFixture<OurAllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurAllProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
