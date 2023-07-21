import { Component, OnInit } from '@angular/core';
import {
  Observable,
  first,
  fromEvent,
  range,
  take,
  map,
  takeWhile,
  interval,
  takeUntil,
  skip,
  from,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
} from 'rxjs';

const heroes = [
  { name: 'Spiderman', age: 15 },
  { name: 'Goblin', age: 14 },
  { name: 'Goblin', age: 16 },
  { name: 'Goblin', age: 16 },
  { name: 'Venom', age: 27 },
  { name: 'Goblin', age: 16 },
  { name: 'Punisher', age: 33 },
  { name: 'Venom', age: 27 },
  { name: 'Venom', age: 27 },
  { name: 'Punisher', age: 33 },
  { name: 'Spiderman', age: 15 },
];

@Component({
  selector: 'app-not-common-operators',
  templateUrl: './not-common-operators.component.html',
  styleUrls: ['./not-common-operators.component.css'],
})
export class NotCommonOperatorsComponent implements OnInit {
  take$: Observable<number> = range(0, 5);
  firstClick$: Observable<PointerEvent> = fromEvent<PointerEvent>(
    document,
    'click'
  );
  takeWhile$: Observable<PointerEvent> = fromEvent<PointerEvent>(
    document,
    'click'
  );
  takeUntilFinisher$: Observable<PointerEvent> = fromEvent<PointerEvent>(
    document,
    'click'
  );
  takeUntilInterval$: Observable<number> = interval(1000);

  skipAndTakeUntilIntervalFinisher$: Observable<PointerEvent> =
    fromEvent<PointerEvent>(document, 'click').pipe(skip(3));
  skipAndTakeUntilInterval$: Observable<number> = interval(1000);

  distinct$ = from([1, 2, 3, 2, 4, 1, 2, 3, 4, 1, 2, 1, 2, 1, 1, 1, 1]);
  heroesDistinct$ = from(heroes);

  distinctUntilChanged$ = from([1, 2, 2, 3, 4, 1, 2, 2, 1, 1, 1, 1]);
  heroesDistinctUntilChanged$ = from(heroes);

  heroesDistinctUntilKeyChange$ = from(heroes);

  ngOnInit(): void {
    this.takeOperator();
    this.firstOperator();
    this.takeWhileOperator();
    this.takeUntil();
    this.skipAndTakeUntil();
    this.distinct();
    this.distinctUntilChanged();
    this.distinctUntilKeyChanged();
  }

  takeOperator(): void {
    this.take$.pipe(take(3)).subscribe({
      next: (value) =>
        console.log('El valor en el operador Take es -->', value),
      complete: () => console.log('Operator Take completado!'),
    });
  }

  firstOperator(): void {
    this.firstClick$.pipe(first()).subscribe({
      next: (value) =>
        console.log('El valor del First operator sin fitlrar es -->', value),
      complete: () => console.log('El operator First filtrado completado!'),
    });

    this.firstClick$
      .pipe(
        map(({ x, y }) => ({ x, y })),
        first(({ x, y }) => x > 500)
      )
      .subscribe({
        next: (value) =>
          console.log('El valor del First operator filtrado es -->', value),
        complete: () => console.log('El operator First filtrado completado!'),
      });
  }

  takeWhileOperator(): void {
    this.takeWhile$
      .pipe(
        map(({ x, y }) => ({ x, y })),
        takeWhile(({ x, y }) => x < 500)
      )
      .subscribe({
        next: (value) =>
          console.log(
            'El valor del operator TakeWhile sin inclusive es -->',
            value
          ),
        complete: () => console.log('takeWhile sin inclusive completado!'),
      });

    this.takeWhile$
      .pipe(
        map(({ x, y }) => ({ x, y })),
        takeWhile(({ x, y }) => x < 500, true)
      )
      .subscribe({
        next: (value) =>
          console.log('El valor del takeWhile con inclusive es -->', value),
        complete: () =>
          console.log('El operator takeWhile con inclusive completado'),
      });
  }

  takeUntil(): void {
    this.takeUntilInterval$.pipe(takeUntil(this.takeUntilFinisher$)).subscribe({
      next: (value) => console.log('El valor del takeUntil es -->', value),
      complete: () => console.log('Operador takeUntil completado!'),
    });
  }

  skipAndTakeUntil(): void {
    this.skipAndTakeUntilInterval$
      .pipe(takeUntil(this.skipAndTakeUntilIntervalFinisher$))
      .subscribe({
        next: (value) =>
          console.log('El valor del skip&TakeUntil es -->', value),
        complete: () => console.log('Operador skip&takeUntil completado!'),
      });
  }

  distinct(): void {
    this.distinct$.pipe(distinct()).subscribe({
      next: (value) => console.log('El valor del distinct es -->', value),
      complete: () => console.log('Operador distinct completado!'),
    });

    this.heroesDistinct$.pipe(distinct((hero) => hero.name)).subscribe({
      next: (value) =>
        console.log('El valor del distinct con keySelector es -->', value),
      complete: () =>
        console.log('Operador distinctcon keySelector completado!'),
    });
  }

  distinctUntilChanged(): void {
    this.distinctUntilChanged$.pipe(distinctUntilChanged()).subscribe({
      next: (value) =>
        console.log('El valor del distinctUntilChanged es -->', value),
      complete: () => console.log('Operador distinctUntilChanged completado!'),
    });

    this.heroesDistinctUntilChanged$
      .pipe(
        distinctUntilChanged(
          (previous, current) => previous.name === current.name
        )
      )
      .subscribe({
        next: (value) =>
          console.log(
            'El valor del distinctUntilChanged con keySelector es -->',
            value
          ),
        complete: () =>
          console.log(
            'Operador distinctUntilChanged con keySelector completado!'
          ),
      });
  }

  distinctUntilKeyChanged(): void {
    this.heroesDistinctUntilKeyChange$
      .pipe(distinctUntilKeyChanged('age'))
      .subscribe({
        next: (value) =>
          console.log('El valor del distinctUntilKeyChange es -->', value),
        complete: () =>
          console.log('Operador distinctUntilKeyChange completado!'),
      });
  }
}
