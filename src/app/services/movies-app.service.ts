import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, mergeMap, find, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class MoviesAppService {
  selectedMovie: any;
  movies: [] = [];
  isLoading$ = new Subject<boolean>();
  studiosList: any;
  nextID: number;
  baseURL: string = "http://localhost:3000/";
  private  $movieObserver = new BehaviorSubject<any>([]);
  
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Método que devuelve el listado de películas y guarda último id
   */
  getMoviesList(){
    this.http.get(this.baseURL+'movies').subscribe((data:any )=> {
      let nextID = 0;
      data.forEach((dataMovie: any) => {
        nextID = dataMovie.id;
      });
      this.setNextID(nextID+1);
      this.setMovieObservable(data);
    }, err => {
      this.router.navigate(['/not-found']);
    })
  }

  /**
   * Método que devuelve el listado de actores
   */
  getActorsList(){
    return this.http.get(this.baseURL+'actors').toPromise();
  }

  /**
   * Método que devuelve el listado de estudios
   */
  getStudiosList(){
    return this.http.get(this.baseURL+'companies').toPromise();
  }

  /**
   * Método que obtiene la película seleccionada
   * @param id 
   * @returns 
   */
  getSelectedMovie(id: number){
    return this.http.get(this.baseURL+'movies/'+id).toPromise();
  }

  /**
   * Método que añade una película a la bbdd
   * @param movie 
   * @returns 
   */
  addMovie(movie:any): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = movie;
    return this.http.post(this.baseURL + 'movies', body, {'headers':headers})
  }

  /**
   * Método que añade una película a la bbdd
   * @param movie 
   * @returns 
   */
   editMovie(movie:any): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = movie;
    return this.http.put(this.baseURL + 'movies/'+movie.id, body, {'headers':headers})
  }

  /**
   * Método que borra una película a la bbdd
   * @param movie 
   * @returns 
   */
   removeMovie(movieId:any): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = movieId;
    return this.http.delete(this.baseURL + 'movies/'+movieId, body)
  }

  /**
   * Método para obtener el nombre y número de los actores de la película seleccionada
   */
   getNamesActorsMovieSelected(actorsList:any, selectedMovie:any){
    let dataActors: string[] = [];
    this.selectedMovie = selectedMovie;
    if(selectedMovie){
      selectedMovie.actors.forEach((actorMovie:any) => {
        actorsList.forEach((actorList:any) => {
          if(actorList.id === actorMovie){
            let first_name = actorList.first_name;
            let last_name = actorList.last_name;
            dataActors.push(first_name +' '+ last_name, actorList.id);
          }
        }); 
      });
    }
    return dataActors;
  }

  /**
   * Método para obtener el estudio de la película seleccionada
   */
  getStudioMovieSelected(selectedMovie: any){
  
    this.getStudiosList().then( data => {
      this.studiosList = data;
      console.log("estudios list", data)
      this.studiosList.forEach((studio:any) => {
        studio.movies.forEach((movieStudio:any) => {
          if(movieStudio == selectedMovie.id){
            selectedMovie.studio = studio.name;
            this.selectedMovie = selectedMovie;
          }
        });
      });
    }); 
    this.setSelectedMovie(this.selectedMovie)
  }

  /**
   * Método que setea la película seleccionada
   * @param selectedMovie 
   */
  setSelectedMovie(selectedMovie:any){
    this.selectedMovie = selectedMovie;
  }

  /**
   * Método que obtiene la película seleccionada
   * @returns 
   */
  getSelectedMovies(){
    return this.selectedMovie;
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

  /**
   * Método que setea el id de la pélicula que se añade
   * @param nextID 
   */
  setNextID(nextID: number){
    this.nextID = nextID;
  }

  /**
   * Método para obtener el id 
   * @returns 
   */
  getNextID(){
   return  this.nextID;
  }
}
