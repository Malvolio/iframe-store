import { Component, ViewChild  } from '@angular/core';
import { Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { AppState } from './redux/app.state';
import { openInformationSelector, all } from './redux/company.selectors';
import { ActionTypes } from './redux/company.actions';

const asApp = company => ({ company });

@Component({
  selector: 'main-page',
  template: `
<mat-card class="site-card">
<h1>Portal</h1>
 <control-panel></control-panel>
</mat-card>
 <portal-member 
     [messagesDown]="store"
     [messagesUp]="store"
     src="http://localhost-trusted.portal.com:4200/sub"></portal-member>
 <portal-member 
     [messagesDown]="protectedOut"
     [messagesUp]="partnerIn"
     src="http://localhost-partner.portal.com:4200/sub"></portal-member>
 <portal-member 
     [messagesDown]="protectedOut"
     src="http://localhost-untrusted.portal.com:4200/sub"></portal-member>
`,
  styles: [
    '.site-card { background-color: rgb(250, 250, 258); }',
    "portal-member { width: 500px; height: 300px; }",
  ],
})
export class MainComponent {
  readonly partnerIn = new Subject<Action>();
  
  constructor(readonly store: Store<AppState>) {
    // install incoming security for partner sites
    // (completely untrusted sites cannot submit actions at all)
    
    const incomingSecurityFilter = action => (action.type === ActionTypes.UpdateCommonInformation);
    
    this.partnerIn.pipe(
      filter(incomingSecurityFilter),
    ).subscribe(action => {
      store.dispatch(action);
    });
  }

  // install outgoing security for less-than-trusted sites
  readonly protectedOut = this.store.select(openInformationSelector).pipe(map(asApp));
}
