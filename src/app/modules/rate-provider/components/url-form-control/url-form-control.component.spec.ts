import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlFormControlComponent } from './url-form-control.component';

describe('UrlFormControlComponent', () => {
  let component: UrlFormControlComponent;
  let fixture: ComponentFixture<UrlFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
