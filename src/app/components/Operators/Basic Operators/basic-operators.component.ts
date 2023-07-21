import { Component, OnInit } from '@angular/core';
import {
  Observable,
  filter,
  from,
  fromEvent,
  interval,
  map,
  mapTo,
  pluck,
  range,
  reduce,
  scan,
  take,
  tap,
} from 'rxjs';

const characters = [
  { type: 'Hero', name: 'Spiderman' },
  { type: 'Villain', name: 'Venom' },
  { type: 'Villain', name: 'Joker' },
];

@Component({
  selector: 'app-basic-operators',
  templateUrl: './basic-operators.component.html',
  styleUrls: ['./basic-operators.component.css'],
})
export class BasicOperatorsComponent implements OnInit {
  mapPor10$: Observable<number> = range(0, 10);
  mapKeyboardEvent$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(
    document,
    'keyup'
  );

  pluckKeyboardEvent$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(
    document,
    'keyup'
  );
  pluckChildPropertyKeyboardEvent$: Observable<KeyboardEvent> =
    fromEvent<KeyboardEvent>(document, 'keyup');

  mapToKeyboardEvent$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(
    document,
    'keyup'
  );

  filterPares$: Observable<number> = range(0, 10);
  filterHero$: Observable<any> = from(characters);

  mapAndFilterKeyboardEvent$: Observable<KeyboardEvent> =
    fromEvent<KeyboardEvent>(document, 'keyup');

  tapRange$: Observable<number> = range(0, 10);

  reduce$: Observable<number> = range(0, 10);
  reduceInterval$: Observable<number> = interval(1000);

  scan$: Observable<number> = range(0, 10);
  scanRedux$: Observable<any> = from([
    { user: 'Pedro', authenticated: false },
    { user: 'Pedro', authenticated: true },
  ]);

  ngOnInit(): void {
    this.mapOperator();
    this.pluckOperator();
    this.mapToOperator();
    this.filterOperator();
    this.filterAndMapOperator();
    this.tapOperator();
    this.reduceOperator();
    this.scanOperator();
    this.reduxExample();
  }

  mapOperator(): void {
    this.mapPor10$
      .pipe(map((value) => value * 10))
      .subscribe((value) =>
        console.log('El valor despues del map es -->', value)
      );

    this.mapKeyboardEvent$
      .pipe(map((keyboardEvent: KeyboardEvent) => keyboardEvent.code))
      .subscribe((mappedKeyboardKey) =>
        console.log('La tecla es -->', mappedKeyboardKey)
      );
  }

  pluckOperator(): void {
    this.pluckKeyboardEvent$
      .pipe(pluck('code'))
      .subscribe((pluckedKeyboardEvent) =>
        console.log('La tecla pluckeada es -->', pluckedKeyboardEvent)
      );

    this.pluckChildPropertyKeyboardEvent$
      .pipe(pluck('target', 'baseURI'))
      .subscribe((pluckedChildPropertyKeyboardEventValue) =>
        console.log(
          'El valor del pluck del child property es -->',
          pluckedChildPropertyKeyboardEventValue
        )
      );
  }

  mapToOperator(): void {
    this.mapToKeyboardEvent$
      .pipe(mapTo('Tecla presionada'))
      .subscribe((mappedToKeyboardEvent) =>
        console.log('El valor del map to es -->', mappedToKeyboardEvent)
      );
  }

  filterOperator(): void {
    this.filterPares$
      .pipe(
        filter((value, index) => {
          console.log('El index de este valor es -->', index);
          return value % 2 == 0 ? true : false;
        })
      )
      .subscribe((filteredValue) =>
        console.log('El value de filter pares es -->', filteredValue)
      );

    this.filterHero$
      .pipe(
        filter((hero) => (hero.type === 'Hero' ? true : false)),
        map((filteredHero) => filteredHero.name)
      )
      .subscribe((filteredHero) =>
        console.log('El filtered hero es -->', filteredHero)
      );
  }

  filterAndMapOperator(): void {
    this.mapAndFilterKeyboardEvent$
      .pipe(
        map((keyboardEvent) => keyboardEvent.code),
        filter((keyboardEventCode) =>
          keyboardEventCode === 'Enter' ? true : false
        )
      )
      .subscribe((value) =>
        console.log('***** El valor de map y filter es --> *****', value)
      );
  }

  tapOperator(): void {
    this.tapRange$
      .pipe(
        tap((value) =>
          console.log('El valor que viene dentro del tap es -->', value)
        ),
        map((value) => value * 10)
      )
      .subscribe((afterTapValue) =>
        console.log('El valor que viene del tap es -->', afterTapValue)
      );
  }

  reduceOperator(): void {
    this.reduce$
      .pipe(
        reduce((total, number, index) => {
          console.log('El index es -->', index);
          return total + number;
        }, 0)
      )
      .subscribe((reducedValue) =>
        console.log('The reduced value is -->', reducedValue)
      );

    this.reduceInterval$
      .pipe(
        take(5),
        reduce((total, value) => total + value, 5)
      )
      .subscribe((value) => console.log('El value es -->', value));
  }

  scanOperator(): void {
    this.scan$
      .pipe(scan((total, value) => total + value))
      .subscribe((scannedValue) =>
        console.log('El scannedValue es -->', scannedValue)
      );
  }

  reduxExample(): void {
    this.scanRedux$
      .pipe(
        scan((actualUser: {}, updatedUser: {}) => {
          return { ...actualUser, ...updatedUser };
        })
      )
      .subscribe((user) => console.log('El estado del user es ->', user));
  }
}
