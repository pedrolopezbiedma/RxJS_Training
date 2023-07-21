import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  fromEvent,
  throttleTime,
  asyncScheduler,
  sampleTime,
  Observable,
  interval,
  sample,
  auditTime,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-time-operators',
  templateUrl: './time-operators.component.html',
  styleUrls: ['./time-operators.component.css'],
})
export class TimeOperatorsComponent implements AfterViewInit {
  @ViewChild('debounceTimeInput') debounceTimeInput: ElementRef;
  @ViewChild('throttleTimeInput') throttleTimeInput: ElementRef;
  @ViewChild('sampleTimeInput') sampleTimeInput: ElementRef;
  @ViewChild('clickObservable') button: ElementRef;
  @ViewChild('clickObservable2') button2: ElementRef;

  sampleInterval$: Observable<number> = interval(500);
  counter: number = 0;

  ngAfterViewInit(): void {
    this.debounceTime();
    this.throttleTime();
    this.sampleTime();
    this.sample();
    this.auditTime();
  }

  debounceTime(): void {
    fromEvent(this.debounceTimeInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((event: any) => event.target.value),
        distinctUntilChanged()
      )
      .subscribe((value: any) =>
        console.log('Lo que hay en el input es -->', value)
      );
  }

  throttleTime(): void {
    fromEvent<KeyboardEvent>(this.throttleTimeInput.nativeElement, 'keyup')
      .pipe(
        map(
          (keyboardEvent) => (keyboardEvent.target as HTMLInputElement).value
        ),
        throttleTime(3000, asyncScheduler, { trailing: true })
      )
      .subscribe((value) =>
        console.log('Lo que hay en el input es --> ', value)
      );
  }

  sampleTime(): void {
    fromEvent<KeyboardEvent>(this.sampleTimeInput.nativeElement, 'keyup')
      .pipe(
        map(({ target }) => (target as HTMLInputElement).value),
        sampleTime(5000)
      )
      .subscribe((letter: any) =>
        console.log('El valor del evento es -->', letter)
      );
  }

  sample(): void {
    let buttonClicked$: Observable<PointerEvent> = fromEvent<PointerEvent>(
      this.button.nativeElement,
      'click'
    );

    this.sampleInterval$
      .pipe(sample(buttonClicked$))
      .subscribe((value) =>
        console.log(
          'El valor del interval una vez clicado el boton es -->',
          value
        )
      );
  }

  auditTime(): void {
    fromEvent<PointerEvent>(this.button2.nativeElement, 'click')
      .pipe(
        tap(() => this.counter++),
        auditTime(5000)
      )
      .subscribe(() => console.log('El contador va asi -->', this.counter));
  }
}
