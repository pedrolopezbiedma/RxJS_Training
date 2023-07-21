import { Component, OnInit } from '@angular/core';
import { Observer, from, fromEvent, interval, of, range, timer } from 'rxjs';

@Component({
  selector: 'app-creation-operators',
  templateUrl: './creation-operators.component.html',
  styleUrls: ['./creation-operators.component.css'],
})
export class CreationOperatorsComponent implements OnInit {
  ofObs$ = of(1, 2, 3, 4, 5);

  from$ = from([1, 2, 3, 4, 5]);

  fromEventObs1$ = fromEvent<PointerEvent>(document, 'click');
  fromEventObs2$ = fromEvent<KeyboardEvent>(document, 'keyup');
  fromEventObserver: Observer<PointerEvent> = {
    next: ({ x, y }) => {
      console.log('Coordenadas del evento de raton son -->', x, y);
    },
    error: (error) => {
      console.error(error);
    },
    complete: () => {
      console.info('Completado!');
    },
  };

  rangeObs$ = range(3, 8);

  interval$ = interval(2000);
  intervalObserver: Observer<number> = {
    next: (value) => {
      console.log('Value in the interval is --> ', value);
    },
    error: (error) => {
      console.log('Error in the interval is -->', error);
    },
    complete: () => {
      console.log('Completed interval!');
    },
  };

  timer$ = timer(5000);
  timerObserver: Observer<number> = {
    next: (value) => {
      console.log('Value in the timer is -->', value);
    },
    error: (error) => {
      console.log('Error in the timer is -->', error);
    },
    complete: () => {
      console.log('Completed timer!');
    },
  };

  ngOnInit(): void {
    this.ofObs$.subscribe(
      (value) => {
        console.log('[CREATION-OPERATORS]: Of next -->', value);
      },
      (error) => {
        console.error('Error');
      },
      () => {
        console.log('[CREATION-OPERATORS]: Of completed');
      }
    );

    this.from$.subscribe((value) => {
      console.log('Value in from observable is -->', value);
    });

    this.fromEventObs1$.subscribe(this.fromEventObserver);

    this.fromEventObs2$.subscribe((event) => {
      console.log('Evento de teclado es -->', event);
    });

    this.rangeObs$.subscribe((range) => {
      console.log('Range observable emit es -->', range);
    });

    this.interval$.subscribe(this.intervalObserver);

    this.timer$.subscribe(this.timerObserver);
  }
}
