import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule} from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailComponent,
    PagesComponent
  ],
  imports: [
    RouterModule,
    PagesRoutingModule
  ],
  exports: [
    HomeComponent,
    DetailComponent,
  ]
})
export class PagesModule { }
