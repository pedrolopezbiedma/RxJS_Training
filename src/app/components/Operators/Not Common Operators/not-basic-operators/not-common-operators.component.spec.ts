import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotBasicOperatorsComponent } from './not-common-operators.component';

describe('NotBasicOperatorsComponent', () => {
  let component: NotBasicOperatorsComponent;
  let fixture: ComponentFixture<NotBasicOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotBasicOperatorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotBasicOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
