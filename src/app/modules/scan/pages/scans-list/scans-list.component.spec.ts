import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScansListComponent } from './scans-list.component';

describe('ScansListComponent', () => {
  let component: ScansListComponent;
  let fixture: ComponentFixture<ScansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScansListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
