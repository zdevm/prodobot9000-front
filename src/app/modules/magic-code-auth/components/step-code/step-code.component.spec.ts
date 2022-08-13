import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCodeComponent } from './step-code.component';

describe('StepCodeComponent', () => {
  let component: StepCodeComponent;
  let fixture: ComponentFixture<StepCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
