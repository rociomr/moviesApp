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
  baseURL: string = "http://localhost:3000/";
  private  $movieObserver = new BehaviorSubject<any>([]);
  //movies$ = this.moviesSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.getMoviesList();
  }

  /**
   * Método que devuelve el listado de películas
   */
  getMoviesList(){
    this.http.get(this.baseURL+'movies').toPromise().then(data => {
      this.setMovieObservable(data);
    })
  }

  /**
   * Método que devuelve el listado de actores
   */
  getActorsList(){
    return this.http.get(this.baseURL+'actors').toPromise();
  }

  /**
   * Método que devuelve el listado de actores
   */
   getNumberActor(fname:string, lname:string){
    return this.http.get(this.baseURL+'actors?first_name'+fname+'&lastname'+lname).toPromise();
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


  addMovie(movie:Movie): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(movie);
    console.log(body)
    return this.http.post(this.baseURL + 'movie', body,{'headers':headers})
  }

  /**
   * Método para obtener el nombre de los actores de la película seleccionada
   */
   getNamesActorsMovieSelected(actorList:[], selectedMovie:any){
    let nameActors: string[] = [];
    let numActors: any;
    this.selectedMovie = selectedMovie;
      if(selectedMovie){
        selectedMovie.actors.forEach((actorMovie:any) => {
          actorList.forEach((actorList:any) => {
            if(actorList.id === actorMovie){
              let first_name = actorList.first_name;
              let last_name = actorList.last_name;
              nameActors.push(first_name +' '+ last_name, actorList.id);
             // numActors.push(actorList.id)
            }
          }); 
        });
      }
     /* let object = {
        "name": nameActors,
        "number": numActors
      }*/
      console.log("object", nameActors)
    return nameActors;
  }

  /**
   * Método para obtener el estudio de la película seleccionada
   */
  getStudioMovieSelected(selectedMovie: Movie){
    this.getStudiosList().then( data => {
      this.studiosList = data;
      this.studiosList.forEach((studio:any) => {
        studio.movies.forEach((movieStudio:any) => {
          if(movieStudio == selectedMovie.id){
           this.selectedMovie.studio = studio.name;
          }
        });
      });
    }); 
    return this.selectedMovie;
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
