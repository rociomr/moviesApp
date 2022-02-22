import { Component, OnInit } from '@angular/core';
import { MoviesAppService} from '../../services/movies-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  moviesList: any = [];
  constructor(private moviesService: MoviesAppService, private router: Router) { }

  ngOnInit(): void {
    this.moviesService.getMovieObservable().subscribe(data => {
      this.moviesList = data;
    })
  }

  goToDetail(movie: any) {
    this.router.navigate(['/detail/', movie.id]);
  }

}
