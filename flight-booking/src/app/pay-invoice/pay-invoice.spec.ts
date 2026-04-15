import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayInvoice } from './pay-invoice';

describe('PayInvoice', () => {
  let component: PayInvoice;
  let fixture: ComponentFixture<PayInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayInvoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
