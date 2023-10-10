import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDownloadComponent } from './custom-download.component';

describe('CustomDownloadComponent', () => {
  let component: CustomDownloadComponent;
  let fixture: ComponentFixture<CustomDownloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDownloadComponent]
    });
    fixture = TestBed.createComponent(CustomDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
