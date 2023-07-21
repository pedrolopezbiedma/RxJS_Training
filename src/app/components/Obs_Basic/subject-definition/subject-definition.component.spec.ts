import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDefinitionComponent } from './subject-definition.component';

describe('SubjectDefinitionComponent', () => {
  let component: SubjectDefinitionComponent;
  let fixture: ComponentFixture<SubjectDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDefinitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
