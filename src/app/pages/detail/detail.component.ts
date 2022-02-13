import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesAppService } from 'src/app/services/movies-app.service';
import { Observable, take, tap } from 'rxjs';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

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
  _movieDataSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private moviesSevice: MoviesAppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
      tap(({id})  => {
        this.movieId = parseInt(id);
      }))
      .subscribe();

    this.moviesSevice.getMovieObservable().subscribe(data => {
      this.movieData = data;
      this.selectedMovie = this.moviesSevice.getSelectedMovie(this.movieData, this.movieId);
    })
  }

}
