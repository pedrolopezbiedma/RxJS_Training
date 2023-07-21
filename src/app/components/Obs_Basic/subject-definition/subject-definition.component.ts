import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-definition',
  templateUrl: './subject-definition.component.html',
  styleUrls: ['./subject-definition.component.css'],
})
export class SubjectDefinitionComponent implements OnInit {
  // Observable Definition
  interval$ = new Observable<number>((subscriber) => {
    const intervalRef = setInterval(() => {
      subscriber.next(Math.random() * 10);
      console.log('interval jajajaj');
    }, 1000);

    return () => {
      clearInterval(intervalRef);
    };
  });

  // Subject Definition
  subject$ = new Subject();

  // Subscriptions
  intervalSubscription1 = new Subscription();
  intervalSubscription2 = new Subscription();
  subjectSubscription = new Subscription();

  ngOnInit(): void {
    // With this approach, every log would show a different random number
    // this.intervalSubscription1 = this.interval$.subscribe((value) => {
    //   console.log('[SUBJECT-DEFINITION: Interval1 logging --> ', value);
    // });
    // this.intervalSubscription2 = this.interval$.subscribe((value) => {
    //   console.log('[SUBJECT-DEFINITION: Interval2 logging --> ', value);
    // });

    // With this approach, the subject 'pipe' the observable
    this.subjectSubscription = this.interval$.subscribe(this.subject$);

    this.subject$.subscribe((value) => {
      console.log('[SUBJECT-DEFINITION: Interval1 logging --> ', value);
    });
    this.subject$.subscribe((value) => {
      console.log('[SUBJECT-DEFINITION: Interval2 logging --> ', value);
    });

    this.subject$.next('Soy el subject');
  }

  stopInterval(): void {
    this.subjectSubscription.unsubscribe();
    // this.intervalSubscription1.unsubscribe();
    // this.intervalSubscription2.unsubscribe();
  }
}
