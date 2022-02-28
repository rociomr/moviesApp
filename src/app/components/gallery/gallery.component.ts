import { Component, OnInit } from '@angular/core';
import { MoviesAppService} from '../../services/movies-app.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  moviesList: any = [];
  constructor(private loadingService: LoadingService, private moviesService: MoviesAppService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.loadingService.showLoader();
    this.moviesService.getMovieObservable().subscribe(data => {
      setTimeout(() => {
        this.moviesList = data;
        this.loadingService.hideLoader();
      }, 1000); 
    }, err => {
      this.router.navigate(['/not-found']);
    })
  }

  goToDetail(movie: any) {
    this.router.navigate(['/detail/', movie.id]);
  }

}
