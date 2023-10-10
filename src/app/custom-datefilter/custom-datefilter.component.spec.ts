import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatefilterComponent } from './custom-datefilter.component';

describe('CustomDatefilterComponent', () => {
  let component: CustomDatefilterComponent;
  let fixture: ComponentFixture<CustomDatefilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDatefilterComponent]
    });
    fixture = TestBed.createComponent(CustomDatefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
