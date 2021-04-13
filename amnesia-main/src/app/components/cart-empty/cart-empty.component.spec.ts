import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEmptyComponent } from './cart-empty.component';

describe('CartEmptyComponent', () => {
  let component: CartEmptyComponent;
  let fixture: ComponentFixture<CartEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
