import { NgModule, Component } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { CompanyState } from './redux/company.state';
import { Routes, RouterModule } from '@angular/router';

import { PortalMessageService } from '../portal/portal-message.service';
import { StoreProxyService } from '../portal/store-proxy.service';


const Titles = {
  "localhost-trusted:4200": "A trusted site",
  "localhost-partner:4200": "A partner site",
  "localhost-untrusted:4200": "A not-terribly trusted site",
};

@Component({
  selector: 'some-foreign-thing',
  template: `
<mat-card class="site-card">
<h1>{{title}}</h1>
<control-panel>
</control-panel>
</mat-card>
`,
  styles: [
    '.site-card { background-color: rgb(250, 250, 258); }',
  ],
})
export class ForeignComponent {
  readonly title = Titles[window.location.host];
  constructor(readonly portalMessageService: PortalMessageService<CompanyState, Action>) {
    console.log('init ForeignComponent');
  }
}

import { MatButtonModule, MatCardModule, MatDividerModule } from '@angular/material';
import { ControlModule  } from './control-panel.component';

const routes: Routes = [
  { path: '**', component: ForeignComponent },
];


@NgModule({
  declarations: [ForeignComponent, ],
  imports: [
    RouterModule.forChild(routes),
    ControlModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  providers: [
    {
      provide: Store,
      useClass: StoreProxyService,
    },
  ],
  exports: [RouterModule],
})
export class ForeignModule {}

