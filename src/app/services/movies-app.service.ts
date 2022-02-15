import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, mergeMap, find, Observable, Subject } from 'rxjs';
import { Movie } from '../shared/interfaces/data.interface';
import { map } from 'rxjs';
@Injectable()
export class MoviesAppService {
  selectedMovie: any;
  movies: [] = [];
  isLoading$ = new Subject<boolean>();

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
