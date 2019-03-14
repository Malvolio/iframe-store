import { CommonModule } from '@angular/common';
import { InputObs, Lifecycle } from './decorators';
import { Component, NgModule } from '@angular/core';
import { Observer, Observable, Subject, ReplaySubject } from 'rxjs';
import { tap, switchAll, map, withLatestFrom } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { MatButtonModule, MatCardModule, MatDividerModule } from '@angular/material';

import { AppState } from './redux/app.state';
import * as CompanyActions from './redux/company.actions';
import { selectCompanyState, commonInformationSelector, privateInformationSelector, publicInformationSelector } from './redux/company.selectors';

@Component({
  selector: 'control-panel',
  template: `
<mat-card>
  <h2>Control Panel</h2>
  <div>Loaded through <span class="url">{{ url }}</span></div>
  <control-item name="Common" [value]="commonValue | async"  (change)="commonControl.next($event)"></control-item>
  <control-item name="Public" [value]="publicValue | async"  (change)="publicControl.next($event)"></control-item>
  <control-item name="Private" [value]="privateValue | async"  (change)="privateControl.next($event)"></control-item>
</mat-card>
`,
  styles: [
    '.url { font-family: monospace; font-size: 125%; }'
  ],
})
export class ControlPanelComponent {
  readonly url = [window.location.protocol, window.location.host].join('//')

  readonly commonValue = this.store.select(commonInformationSelector);

  readonly publicValue = this.store.select(publicInformationSelector);

  readonly privateValue = this.store.select(privateInformationSelector);

  readonly commonControl = new Subject<number>();
  readonly publicControl = new Subject<number>();
  readonly privateControl = new Subject<number>();

  private establishControl(control: Observable<number>, makeAction: (n: number) => CompanyActions.ActionsUnion) {
    control.pipe(
      map(makeAction)
    ).subscribe(action => {
      this.store.dispatch(action);
    });
  }
  
  constructor(private readonly store: Store<AppState>) {
    this.establishControl(this.commonControl, n => new CompanyActions.UpdateCommonInformation(n));
    this.establishControl(this.publicControl, n => new CompanyActions.UpdatePublicInformation(n));
    this.establishControl(this.privateControl, n => new CompanyActions.UpdatePrivateInformation(n));
  }
}

import { ControlItemComponent  } from './control-item.component';

@NgModule({
  declarations: [
    ControlPanelComponent,
    ControlItemComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  exports: [ ControlPanelComponent, ],
})
export class ControlModule { }
