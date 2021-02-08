import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderConfirmDialogComponent } from './cancel-order-confirm-dialog.component';

describe('CancelOrderConfirmDialogComponent', () => {
  let component: CancelOrderConfirmDialogComponent;
  let fixture: ComponentFixture<CancelOrderConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelOrderConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
