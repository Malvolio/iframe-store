import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PortalMemberComponent } from './portal-member.component';
import { PortalMessageService } from './portal-message.service';

@NgModule({
  declarations: [
    PortalMemberComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [ PortalMessageService ],
  exports: [ PortalMemberComponent ],
  bootstrap: [ ]
})
export class PortalModule { }
