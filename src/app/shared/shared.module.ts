import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    RouterModule,
    NotFoundComponent
  ]
})
export class SharedModule { }
