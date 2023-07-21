import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  Observable,
  concatMap,
  debounceTime,
  exhaustMap,
  fromEvent,
  interval,
  map,
  mergeAll,
  mergeMap,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

interface GitHubUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

@Component({
  selector: 'app-transformation-operators',
  templateUrl: './transformation-operators.component.html',
  styleUrls: ['./transformation-operators.component.css'],
})
export class TransformationOperatorsComponent implements AfterViewInit {
  @ViewChild('mergeAllInput') mergeAllInput: ElementRef;
  @ViewChild('mergeMapInput') mergeMapInput: ElementRef;
  @ViewChild('switchMapInput') switchMapInput: ElementRef;
  @ViewChild('mergeMapButton', { read: ElementRef }) mergeMapButton: ElementRef;
  @ViewChild('concatMapButton', { read: ElementRef })
  concatMapButton: ElementRef;
  @ViewChild('exhaustMapButton', { read: ElementRef })
  exhaustMapButton: ElementRef;

  mergeMapLetter$ = of('a', 'b', 'c');
  mergeAllGithubUsers$: Observable<any>;
  mergeMapGithubUsers$: Observable<any>;

  ngAfterViewInit(): void {
    this.mergeAll();
    this.mergeMap();
    this.switchMap();
    this.concatMap();
    this.exhaustMap();
  }

  mergeAll(): void {
    const mergeAllInput$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(
      this.mergeAllInput.nativeElement,
      'keyup'
    );

    this.mergeAllGithubUsers$ = mergeAllInput$.pipe(
      debounceTime(500),
      map<KeyboardEvent, string>(
        (inputKeyEvent: any) => inputKeyEvent.target.value
      ),
      tap((value) => console.log(value)),
      map<string, Observable<GitHubUsersResponse>>((eventTerm: any) =>
        ajax.getJSON('https://api.github.com/search/users?q=' + eventTerm)
      ),
      mergeAll<Observable<GitHubUsersResponse>>(),
      map<GitHubUsersResponse, GitHubUser[]>((githubResponse: any) =>
        githubResponse.items.slice(0, 5)
      )
    );
  }

  mergeMap(): void {
    const mergeMapInput$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(
      this.mergeMapInput.nativeElement,
      'keyup'
    );

    this.mergeMapGithubUsers$ = mergeMapInput$.pipe(
      debounceTime(500),
      map((inputKeyboardEvent: any) => inputKeyboardEvent.target.value),
      mergeMap((eventTerm) =>
        ajax.getJSON('https://api.github.com/search/users?q=' + eventTerm)
      ),
      map((githubUsers: any) => githubUsers.items.slice(0, 5))
    );

    this.mergeMapLetter$
      .pipe(
        mergeMap((letter) =>
          interval(1000).pipe(
            take(3),
            map((intervalNumber) => intervalNumber + letter)
          )
        )
      )
      .subscribe((value) => console.log('Emision is -->', value));

    let mousedown$ = fromEvent(this.mergeMapButton.nativeElement, 'mousedown');
    let mouseup$ = fromEvent(this.mergeMapButton.nativeElement, 'mouseup');

    mousedown$
      .pipe(mergeMap(() => interval().pipe(takeUntil(mouseup$))))
      .subscribe((value) => console.log(value));
  }

  switchMap(): void {
    fromEvent(this.switchMapInput.nativeElement, 'keyup')
      .pipe(
        map((keyboardInput: any) => keyboardInput.target.value),
        switchMap((eventTerm) =>
          ajax.getJSON('https://httpbin.org/delay/1?arg=' + eventTerm)
        )
      )
      .subscribe((value) => console.log(value));
  }

  concatMap(): void {
    fromEvent(this.concatMapButton.nativeElement, 'click')
      .pipe(concatMap(() => interval(1000).pipe(take(3))))
      .subscribe((value) => console.log('Concat Map emission -->', value));
  }

  exhaustMap(): void {
    fromEvent(this.exhaustMapButton.nativeElement, 'click')
      .pipe(exhaustMap(() => interval(1000).pipe(take(3))))
      .subscribe((value) => console.log('Exhaust Map emission -->', value));
  }
}
