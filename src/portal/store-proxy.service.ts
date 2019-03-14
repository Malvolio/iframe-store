import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import { PortalMessageService } from './portal-message.service';

/**
 * This is a proxy store: that is, it looks like a store to its
 * injectees, but it has no internal mechanism and only acts as
 * a proxy to/from the real store in the exclosing browser window.
 */
@Injectable({
  providedIn: 'root',
})
export class StoreProxyService<State> extends PortalMessageService<State, Action> {

  dispatch(action: Action) {
    this.next(action);
  }

  select<X>(selector: (s: State) => X): Observable<X> {
    return this.pipe(map(selector));
  }
}
