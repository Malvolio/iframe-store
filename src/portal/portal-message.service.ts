import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, ReplaySubject, fromEvent } from 'rxjs';
import { map, tap, filter, withLatestFrom } from 'rxjs/operators';
import { createPortalMessage, makeTrustedMessagePipe } from './utils';

@Injectable({
  providedIn: 'root',
})
export class PortalMessageService<Down, Up> extends Observable<Down> implements Observer<Up> {

  private readonly trustedPortalMessages = makeTrustedMessagePipe<Down>();
  
  private readonly comingDown = this.trustedPortalMessages.pipe(
    map(({payload}) => payload),
  );
  private readonly goingUp = new Subject<Up>();


  constructor() {
    super(observer => this.comingDown.subscribe(observer));
    
    this.goingUp.pipe(withLatestFrom(this.trustedPortalMessages))
      .subscribe(([message, portalMessage]) => {
        window.parent.postMessage(createPortalMessage(portalMessage.secret, message), portalMessage.url);
    });
  }

  next(n: Up) {
    this.goingUp.next(n);
  }

  error(e: any) {
  }

  complete() {
  }
}
