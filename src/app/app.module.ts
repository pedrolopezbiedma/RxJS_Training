import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObsDefinitionComponent } from './components/Obs_Basic/obs-definition/obs-definition.component';
import { SubjectDefinitionComponent } from './components/Obs_Basic/subject-definition/subject-definition.component';
import { CreationOperatorsComponent } from './components/Obs_Creation/creation-operators.component';
import { BasicOperatorsComponent } from './components/Operators/Basic Operators/basic-operators.component';
import { NotCommonOperatorsComponent } from './components/Operators/Not Common Operators/not-basic-operators/not-common-operators.component';
import { TimeOperatorsComponent } from './components/Operators/Time Operators/time-operators/time-operators.component';
import { TransformationOperatorsComponent } from './components/Operators/Transformation Operators/transformation-operators/transformation-operators.component';
import { ObsCombinationComponent } from './components/Obs_Combination/obs-combination/obs-combination.component';
import { ExercisesComponent } from './components/Exercises/exercises/exercises.component';

@NgModule({
  declarations: [
    AppComponent,
    ObsDefinitionComponent,
    SubjectDefinitionComponent,
    CreationOperatorsComponent,
    BasicOperatorsComponent,
    NotCommonOperatorsComponent,
    TimeOperatorsComponent,
    TransformationOperatorsComponent,
    ObsCombinationComponent,
    ExercisesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
