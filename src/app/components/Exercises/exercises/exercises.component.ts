import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Observable,
  combineLatest,
  concatMap,
  delay,
  filter,
  from,
  interval,
  map,
  of,
  reduce,
  take,
  tap,
  toArray,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent {
  // Exercise 1
  normalizedVillains = ['joker', 'thanos', 'ganondorf', 'bowser'];
  capitalizedVillains$: Observable<string[]>;

  // Exercise 2
  mixedItems = [1, 4, 5, 'Banana', 7, 'Pablo'];
  arrayAggregate: number = 0;

  // Exercise 4
  @ViewChild('countdownStartInput') countdownStartInput: ElementRef;
  countdown$: Observable<number>;

  // Exercise 5
  combineObs1$ = of(1, 2, 3, 4, 5);
  combineObs2$ = of('a', 'b', 'c', 'd', 'e');
  combineObs3$ = interval(400).pipe(take(5));
  combinedObservable$: Observable<any>;

  // Exercise 6
  C3POUrl = 'https://swapi.dev/api/people/2';
  starWarsDroneSpecie: any;

  runExercise1(): void {
    this.capitalizedVillains$ = from(this.normalizedVillains).pipe(
      map(
        (normalizedVillain: string) =>
          normalizedVillain.charAt(0).toUpperCase() + normalizedVillain.slice(1)
      ),
      toArray()
    );
  }

  runExercise2(): void {
    from(this.mixedItems)
      .pipe(
        filter((arrayItem: any) => typeof arrayItem === 'number'),
        reduce((arrayAggregate, arrayItem) => arrayAggregate + arrayItem)
      )
      .subscribe((aggregate) => (this.arrayAggregate = aggregate));
  }

  runExercise4(): void {
    let countdownStart = +this.countdownStartInput.nativeElement.value;

    this.countdown$ = interval(1000).pipe(
      map((intervalValue) => countdownStart - intervalValue),
      take(countdownStart + 1)
    );
  }

  runExercise5(): void {
    this.combinedObservable$ = combineLatest({
      first: this.combineObs1$,
      second: this.combineObs2$,
      third: this.combineObs3$,
    }).pipe(
      map((response) => response.first + response.second + response.third)
    );
  }

  runExercise6(): void {
    ajax
      .getJSON(this.C3POUrl)
      .pipe(
        map((c3POData: any) => c3POData.species[0]),
        concatMap((c3POSpecie) => ajax.getJSON(c3POSpecie))
      )
      .subscribe((response) => (this.starWarsDroneSpecie = response));
  }
}
