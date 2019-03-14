import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule, MatCardModule, MatDividerModule } from '@angular/material';

import { MainComponent } from './main.component';
import { ForeignModule } from './foreign.component';
import { PortalModule } from '../portal/portal.module';
import { ControlModule  } from './control-panel.component';
import { ControlPanelComponent  } from './control-panel.component';
import { reducer } from './redux/company.reducer';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    BrowserModule,
    PortalModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    StoreModule.forFeature('company', reducer),
    ControlModule,
    ForeignModule,
  ],
  providers: [  ],
})
export class MainModule { }

