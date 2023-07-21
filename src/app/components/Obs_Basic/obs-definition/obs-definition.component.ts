import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-obs-definition',
  templateUrl: './obs-definition.component.html',
  styleUrls: ['./obs-definition.component.css'],
})
export class ObsDefinitionComponent implements OnInit {
  // Observable definitions
  obs$ = new Observable<string>((subscriber) => {
    subscriber.next('Hola Mundo');
    subscriber.complete();
  });

  interval$ = new Observable<number>((subscriber) => {
    let count = 0;
    const intervalRef = setInterval(() => {
      subscriber.next(count);
      count++;
      console.log('[OBS-DEFINITION: Interval logging --> Im in the interval');
    }, 1000);

    // This will execute when the unsubscribe is triggered ( Comment it in & out to play with this and understand )
    return () => {
      clearInterval(intervalRef);
    };
  });

  // Subscriptions
  intervalSubscription: Subscription;

  // Observer to react to Observable definition
  observer: Observer<any> = {
    next: (value: string) => {
      console.log('[OBS-DEFINITION: Next] value is -->', value);
    },
    error: (value: string) => {
      console.warn('[OBS-DEFINITION: Error] value is -->', value);
    },
    complete: () => {
      console.info('[OBS-DEFINITION: Complete] --> Completed!!!');
    },
  };

  ngOnInit(): void {
    // Subscribing to the observables to react to them.
    this.obs$.subscribe(this.observer);

    this.intervalSubscription = this.interval$.subscribe((interval) => {
      console.log('[OBS-DEFINITION: Interval -->', interval);
    });
  }

  stopInterval(): void {
    this.intervalSubscription.unsubscribe();
  }
}
