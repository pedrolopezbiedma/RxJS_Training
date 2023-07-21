import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Observable,
  combineLatest,
  concat,
  delay,
  endWith,
  forkJoin,
  fromEvent,
  interval,
  map,
  merge,
  of,
  startWith,
  take,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-obs-combination',
  templateUrl: './obs-combination.component.html',
  styleUrls: ['./obs-combination.component.css'],
})
export class ObsCombinationComponent implements OnInit, AfterViewInit {
  @ViewChild('combineLatestInput1') combineLatestInput1: ElementRef;
  @ViewChild('combineLatestInput2') combineLatestInput2: ElementRef;

  letter$: Observable<string> = of('a', 'b', 'c', 'd');
  pendingRequest: boolean = false;

  concatInterval1$ = interval(1000).pipe(take(3));
  concatInterval2$ = interval(1000).pipe(take(3));

  clickEvent$: Observable<any> = fromEvent<any>(document, 'click');
  keyboardEvent$: Observable<any> = fromEvent<any>(document, 'keyup');

  forkJoinNumbers$ = of(1, 2, 3, 4, 5);
  forkJoinInterval$ = interval(1000).pipe(take(3));
  forkJoinLetters$ = of('a', 'b', 'c', 'd', 'e').pipe(delay(3500));

  ngOnInit(): void {
    this.startWith();
    this.endWith();
    this.pendingRequestMethod();
    this.concatMethod();
    this.mergeMethod();
    this.forkJoin();
    this.forkJoinRealExample();
  }

  ngAfterViewInit(): void {
    this.combineLatest();
  }

  startWith(): void {
    this.letter$.pipe(startWith(1)).subscribe({
      next: (value) => console.log('El value de startWith es -->', value),
      complete: () => console.log('El startWith se ha completado'),
    });
  }

  endWith(): void {
    this.letter$.pipe(endWith(9)).subscribe({
      next: (value) => console.log('El value de startWith es -->', value),
      complete: () => console.log('El endWith se ha completado'),
    });
  }

  pendingRequestMethod(): void {
    ajax
      .getJSON('https://reqres.in/api/users/2?delay=10')
      .pipe(startWith((this.pendingRequest = true)))
      .subscribe((response: any) => {
        console.log('Response from the request is -->', response);
        typeof response === 'boolean'
          ? (this.pendingRequest = response)
          : (this.pendingRequest = false);
      });
  }

  concatMethod(): void {
    concat(this.concatInterval1$, this.concatInterval2$).subscribe({
      next: (value) =>
        console.log('Value in the concat subscribe is -->', value),
      complete: () => console.log('Subscription completed in Concat method'),
    });
  }

  mergeMethod(): void {
    merge(this.clickEvent$, this.keyboardEvent$)
      .pipe(take(5))
      .subscribe((value) =>
        console.log('Value from merge method is -->', value)
      );
  }

  combineLatest(): void {
    const combineLatestInput1$ = fromEvent(
      this.combineLatestInput1?.nativeElement,
      'keyup'
    );
    const combineLatestInput2$ = fromEvent(
      this.combineLatestInput2?.nativeElement,
      'keyup'
    );

    combineLatest({
      input1: combineLatestInput1$,
      input2: combineLatestInput2$,
    })
      .pipe(map(([input1, input2]: any) => input1.key + input2.key))
      .subscribe((repsonse) =>
        console.log('Value in the combineLatest is --> ', repsonse)
      );
  }

  forkJoin(): void {
    forkJoin({
      number: this.forkJoinNumbers$,
      interval: this.forkJoinInterval$,
      letter: this.forkJoinLetters$,
    }).subscribe((response) =>
      console.log(
        'Los valores del forkJoin son -->',
        response.number,
        response.interval,
        response.letter
      )
    );
  }

  forkJoinRealExample(): void {
    forkJoin({
      main: ajax.getJSON('https://api.github.com/users/klerith'),
      repos: ajax.getJSON('https://api.github.com/users/klerith/repos'),
      gists: ajax.getJSON('https://api.github.com/users/klerith/gists'),
    }).subscribe((response) =>
      console.log(
        'La respuesta es -->',
        response.main,
        response.repos,
        response.gists
      )
    );
  }
}
