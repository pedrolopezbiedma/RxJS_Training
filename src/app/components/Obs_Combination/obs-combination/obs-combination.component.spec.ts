import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsCombinationComponent } from './obs-combination.component';

describe('ObsCombinationComponent', () => {
  let component: ObsCombinationComponent;
  let fixture: ComponentFixture<ObsCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObsCombinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObsCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
