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
import { NewMovieComponent } from './new-movie/new-movie.component';
import { MoviesAppService} from '../services/movies-app.service';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailComponent,
    PagesComponent,
    MenuComponent,
    GalleryComponent,
    ModalFormComponent,
    NewMovieComponent,
    FormComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent,
    DetailComponent,
    FormComponent
  ],
  providers: [
    MoviesAppService
  ]
})
export class PagesModule { }
