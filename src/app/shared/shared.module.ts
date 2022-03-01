import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from '../modules/amaterial.module';
import {TranslateModule} from '@ngx-translate/core';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    NotFoundComponent,
    LoadingComponent,
    MaterialModule,
    TranslateModule
  ],
  providers: [
    
  ]
})
export class SharedModule { }
