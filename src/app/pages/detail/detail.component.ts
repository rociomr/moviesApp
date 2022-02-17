import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesAppService } from 'src/app/services/movies-app.service';
import { Observable, take, tap } from 'rxjs';
import { Subscription } from 'rxjs';
import { Actor } from 'src/app/shared/interfaces/data.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  selectedMovie: any;
  form: any;
  movieId: number;
  movie$: Observable<any>;
  movieData: any;
  studio: string;
  actorsList: any;
  studiosList: any;
  nameActors: string[] = [];
  _movieDataSubscription: Subscription;

  constructor(private moviesService: MoviesAppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
      tap(({id})  => {
        this.movieId = parseInt(id);
      }))
    .subscribe();

    this.moviesService.getSelectedMovie(this.movieId).then((data:any) =>{
      this.selectedMovie = data;
      this.moviesService.getActorsList().then( data => {
        this.actorsList = data;
        let dataActors = this.moviesService.getNamesActorsMovieSelected(this.actorsList, this.selectedMovie);
        let numActors = dataActors.filter(num => typeof num == 'number')
        this.nameActors = dataActors.filter(actor => typeof actor == 'string')
      })
      this.moviesService.getStudioMovieSelected(this.selectedMovie);
    });
  }
}
