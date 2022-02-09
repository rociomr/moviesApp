import { Component, OnInit } from '@angular/core';
import { MoviesAppService} from '../../services/movies-app.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  moviesList: any = [];
  constructor(private moviesService: MoviesAppService) { }

  ngOnInit(): void {
    this.moviesService.getMoviesList().then( data => {
      this.moviesList = data;

      console.log('moviesList', this.moviesList);

     });
  }

  addMovie() {
    
  }

  editMovie() {

  }

}
