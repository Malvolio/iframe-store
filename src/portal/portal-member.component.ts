import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Subject, ReplaySubject, Observer, combineLatest, interval, Observable, fromEvent, of as observableOf, from as observableFrom } from 'rxjs';
import { delay, switchAll, switchMap, map, tap, filter, first, withLatestFrom} from 'rxjs/operators';
import { createPortalMessage, makeTrustedMessagePipe, withLatestFromBuffered } from './utils';

@Component({
  selector: 'portal-member',
  template: `
  <iframe #iframe></iframe>
`,
  styles: [
    'iframe { height: 500px; width: 500px; border: none; }'
  ],
})
export class PortalMemberComponent<Down, Up> implements OnInit {
  private readonly messagesDownObs = new ReplaySubject<Observable<Down>>(1);
  @Input() set messagesDown(obs: Observable<Down>) {
    this.messagesDownObs.next(obs);
  }

  private readonly messagesUpObs = new ReplaySubject<Observer<Up>>(1);
  @Input() set messagesUp(obs: Observer<Up>) {
    this.messagesUpObs.next(obs);
  }

  readonly urlObs = new ReplaySubject<string>(1);
  @Input() set src(u: string) {
    this.urlObs.next(u);
  }

  private readonly iframeObs = new ReplaySubject<ElementRef>(1);
  @ViewChild('iframe') private set _iframe(iframe: ElementRef) {
    if (iframe) {
      this.iframeObs.next(iframe);
    }
  }

  private readonly trustedChildMessages = makeTrustedMessagePipe<Up>();

  private readonly secret = Math.floor(Math.random() * 1000000);
  
  ngOnInit() {
    const window = combineLatest(this.urlObs, this.iframeObs).pipe(
      tap(([url, iframe]) => {
        // if we use ordinary parameter-binding on the iframe, it
        // interferes with the ViewChild.  Since we are messing around
        // with the native element anyway...
        iframe.nativeElement.src = url;
      }),
      map(([url, iframe])  => [url, iframe.nativeElement.contentWindow]),
      delay(2500), // TODO: figure a better way to know when the iframe loads
    );
    
    this.messagesDownObs.pipe(
      switchAll(),
      withLatestFromBuffered(window)
    ).subscribe(([message, [url, window]]) => {
      window.postMessage(createPortalMessage(this.secret, message), url);
    });

    this.trustedChildMessages.pipe(
      filter(message => message.secret === this.secret),
      withLatestFrom(this.messagesUpObs)).subscribe(([m, obs]) => {
      obs.next(m.payload);
    });
  }
}
