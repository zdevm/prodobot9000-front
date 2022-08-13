import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepEmailComponent } from './step-email.component';

describe('StepEmailComponent', () => {
  let component: StepEmailComponent;
  let fixture: ComponentFixture<StepEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
