import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, mergeMap, find, Observable, Subject } from 'rxjs';
import { Movie } from '../shared/interfaces/data.interface';
import { map } from 'rxjs';
import { C } from '@angular/cdk/keycodes';


@Injectable()
export class MoviesAppService {
  selectedMovie: any;
  movies: [] = [];
  isLoading$ = new Subject<boolean>();
  studiosList: any;
  private  $movieObserver = new BehaviorSubject<any>([]);
  //movies$ = this.moviesSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.getMoviesList();
  }

  /**
   * Método que devuelve el listado de películas
   */
  getMoviesList(){
    this.http.get('http://localhost:3000/movies').toPromise().then(data => {
      this.setMovieObservable(data);
    })
  }

  /**
   * Método que devuelve el listado de actores
   */
  getActorsList(){
    return this.http.get('http://localhost:3000/actors').toPromise();
  }

  /**
   * Método que devuelve el listado de estudios
   */
  getStudiosList(){
    return this.http.get('http://localhost:3000/companies').toPromise();
  }

  /**
   * Método que recibe listado e id y devuelve la película selecciona
   * @param movie 
   * @param id 
   * @returns 
   */
  getSelectedMovie(movie: any, id: number){
    let movieSelected : any;
    movie.map((data: any) => {
      if(data.id === id){
        movieSelected = data ;
      }
      
    })
    return movieSelected;
  }

  /**
   * Método para obtener el nombre de los actores de la película seleccionada
   */
   getNamesActorsMovieSelected(actorList:[], movieId: number){
    let movieData;
    let nameActors: string[] = [];
    this.getMovieObservable().subscribe(data => {
      movieData = data;
      console.log("movieData", movieData)
      this.selectedMovie = this.getSelectedMovie(movieData, movieId);
      console.log("selectedMovie service", this.selectedMovie)
      //debugger;
      if(this.selectedMovie){
        this.selectedMovie.actors.forEach((actorMovie:any) => {
          actorList.forEach((actorList:any) => {
            if(actorList.id === actorMovie){
              let first_name = actorList.first_name;
              let last_name = actorList.last_name;
              nameActors.push(first_name +' '+ last_name);
            }
          }); 
        });
      }
    })
   // console.log("nameActors", nameActors)
    return nameActors;
  }

  /**
   * Método para obtener el estudio de la película seleccionada
   */
  getStudioMovieSelected(){
    this.getStudiosList().then( data => {
      this.studiosList = data;
      this.studiosList.forEach((studio:any) => {
        studio.movies.forEach((movieStudio:any) => {
          if(movieStudio == this.selectedMovie.id){
           this.selectedMovie.studio = studio.name;
          }
        });
      });
     // console.log("this.selectedMovie", this.selectedMovie)
      
    }); return this.selectedMovie;
  }

  /**
   * Método obtiene el listado de nombre de los actores
   * @param actorsList 
   * @returns 
   */
   getNamesActors(actorsList: []) {
    let name, firstname, lastname;
    let allActors: any = [];
    actorsList.forEach((actor: any) => {
      firstname = actor.first_name;
      lastname = actor.last_name;
      name = firstname.concat(' ', lastname);
      allActors.push(name)
    });
    return allActors;
  }

  /**
   * Método obtiene el listado de nombres de los estudios
   * @param studiosList 
   * @returns 
   */
    getNameStudiosList(studiosList: []) {
      let allStudios: any = [];
      studiosList.forEach((studio: any) => {
        allStudios.push(studio.name);      
      });
      return allStudios;
    }

    /**
     * Devuelve el observable de los datos de peliculas
     * @returns 
     */
  getMovieObservable(): Observable<Object> {
    return this.$movieObserver.asObservable();
  }
  
  /**
   * Modifica los datos del observable
   * @param movieData 
   */
  setMovieObservable(movieData: any) {
    this.$movieObserver.next(movieData);
  }  

  show() {
    this.isLoading$.next(true);
  }

  hide() {
    this.isLoading$.next(false);
  }

}
