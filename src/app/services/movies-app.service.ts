import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesAppService {
  selectedMovie: any;
  constructor(private http: HttpClient) { }

  getMoviesList(){
    return this.http.get('http://localhost:3000/movies').toPromise();
  }

  getActorsList(){
    return this.http.get('http://localhost:3000/actors').toPromise();
  }

  getStudiosList(){
    return this.http.get('http://localhost:3000/companies').toPromise();
  }

  setSelectedMovie(movie:any){
    this.selectedMovie = movie;
    
  }
  getSelectedMovie(){
    return this.selectedMovie;
  }
}
