import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MaterialModule } from "./amaterial.module";
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
//import { MoviesService } from './services/movies.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
