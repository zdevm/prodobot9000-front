import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicCodeAuthComponent } from './magic-code-auth.component';

describe('MagicCodeAuthComponent', () => {
  let component: MagicCodeAuthComponent;
  let fixture: ComponentFixture<MagicCodeAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicCodeAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicCodeAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
