import { NgModule } from '@angular/core';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule} from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MenuComponent } from '../components/menu/menu.component';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { ModalFormComponent } from '../components/modal-form/modal-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    DetailComponent,
    PagesComponent,
    MenuComponent,
    GalleryComponent,
    ModalFormComponent,
    
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent,
    DetailComponent,
  ]
})
export class PagesModule { }
