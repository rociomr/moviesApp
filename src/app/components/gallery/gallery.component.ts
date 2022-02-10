import { Component, OnInit } from '@angular/core';
import { MoviesAppService} from '../../services/movies-app.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  moviesList: any = [];
  constructor(private moviesService: MoviesAppService, private router: Router) { }

  ngOnInit(): void {
    this.moviesService.getMoviesList().then( data => {
      this.moviesList = data;

      console.log('moviesList', this.moviesList);

     });
  }

  addMovie() {
    
  }

  goToDetail(movie: any) {
    this.moviesService.setSelectedMovie(movie);
    this.router.navigate(['/detail']);
  }

}
