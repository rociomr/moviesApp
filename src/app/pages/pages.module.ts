import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule} from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuComponent } from '../components/menu/menu.component';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    DetailComponent,
    PagesComponent,
    HeaderComponent,
    MenuComponent,
    GalleryComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
    DetailComponent,
  ]
})
export class PagesModule { }
