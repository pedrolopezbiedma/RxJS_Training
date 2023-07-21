import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsDefinitionComponent } from './obs-definition.component';

describe('ObsDefinitionComponent', () => {
  let component: ObsDefinitionComponent;
  let fixture: ComponentFixture<ObsDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObsDefinitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObsDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
