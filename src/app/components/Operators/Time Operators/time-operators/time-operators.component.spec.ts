import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOperatorsComponent } from './time-operators.component';

describe('TimeOperatorsComponent', () => {
  let component: TimeOperatorsComponent;
  let fixture: ComponentFixture<TimeOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOperatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
