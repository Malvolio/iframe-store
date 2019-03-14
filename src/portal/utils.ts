import { Observable, OperatorFunction, fromEvent } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

const PortalMessageType = 'PortalMessage';

export interface PortalMessage<T> {
  type: 'PortalMessage';
  url: string,
  secret: number,
  payload: T;
}

export function isPortalMessage<T>(e: any): e is PortalMessage<T> {
  return e && (e['type'] === PortalMessageType);
}

export function createPortalMessage<T>(secret: number, payload: T): PortalMessage<T> {
  return {
    type: PortalMessageType,
    url: [window.location.protocol, window.location.host].join('//'),
    secret,
    payload
  };
}

export function makeTrustedMessagePipe<T>() {
  return fromEvent(window, 'message').pipe(
    filter(event => event.isTrusted),
    map((event: any) => event.data),
    filter(m => isPortalMessage<T>(m)),
  );
}

/**
 * withLatestFromBuffered -- an operator that works like withLatestFrom except
 * emissions from the outer source are buffered until the un
 */
export function withLatestFromBuffered<P, Q>(obs: Observable<Q>) : OperatorFunction<P, [P, Q]> {
    return source => new Observable(observer => {
        let buffer = [];
        let onEmit = p => {
            buffer.push(p);
        };
        const sub1 = source.subscribe(p => onEmit(p));
        const sub2 = obs.subscribe(q => {
            onEmit = p => {
                observer.next([p, q]);
            };
            buffer.forEach(onEmit);
            buffer = [];
        });
        return () => {
            sub1.unsubscribe();
            sub2.unsubscribe();
        };
    });
}

