import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupProviderComponent } from './setup-provider.component';

describe('SetupProviderComponent', () => {
  let component: SetupProviderComponent;
  let fixture: ComponentFixture<SetupProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
