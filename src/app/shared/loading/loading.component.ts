import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { MoviesAppService } from 'src/app/services/movies-app.service';
import { LoadingService } from './loading.service';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  //isLoading$ = this.movieService.isLoading$;
  public show = true;
  constructor( private loaderService: LoadingService){

  }
  ngOnInit() {
    this.loaderService.getSubscription().subscribe(async (response: any) => {
      this.show = await response.show;
    })
  }

}
