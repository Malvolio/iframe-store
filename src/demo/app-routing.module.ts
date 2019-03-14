import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { MainComponent } from './main.component';
import { ForeignModule } from './foreign.component';

const routes: Routes = [
  {
    path: 'sub',
    loadChildren: () => ForeignModule,
  },
  {
    path: 'main',
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
