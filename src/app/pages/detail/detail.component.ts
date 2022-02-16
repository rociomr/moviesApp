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

  constructor(private moviesSevice: MoviesAppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
      tap(({id})  => {
        this.movieId = parseInt(id);
      }))
      .subscribe();

    this.moviesSevice.getActorsList().then( data => {
      this.actorsList = data;
      //this.nameActors
      let dataSelected = this.moviesSevice.getNamesActorsMovieSelected(this.actorsList, this.movieId);
      console.log("dataSElected", dataSelected)
      this.selectedMovie = this.moviesSevice.getStudioMovieSelected();
      console.log("aqui", this.selectedMovie)
    })
  }

  /**
   * Método para obtener el nombre de los actores de la película seleccionada
   */
  getNamesActorsMovieSelected(){
    this.moviesSevice.getMovieObservable().subscribe(data => {
      this.movieData = data;
      console.log("movieData", this.movieData)
      this.selectedMovie = this.moviesSevice.getSelectedMovie(this.movieData, this.movieId);
      console.log("selectedMovie actors", this.selectedMovie)
      this.selectedMovie.actors.forEach((actorMovie:any) => {
        this.actorsList.forEach((actorList:any) => {
          if(actorList.id === actorMovie){
            let first_name = actorList.first_name;
            let last_name = actorList.last_name;
            this.nameActors.push(first_name +' '+ last_name)
          }
        })
      });
    })
  }

  /**
   * Método para obtener el estudio de la película seleccionada
   */
  getStudioMovieSelected(){
    this.moviesSevice.getStudiosList().then( data => {
      this.studiosList = data;
      console.log("selectedMovie studio", this.selectedMovie)
      this.studiosList.forEach((studio:any) => {
        studio.movies.forEach((movieStudio:any) => {
          if(movieStudio == this.selectedMovie.id){
           this.selectedMovie.studio = studio.name;
          }
        });
      });
    }) 
  }
}
