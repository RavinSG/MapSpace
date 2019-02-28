import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {routes} from './routes';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
