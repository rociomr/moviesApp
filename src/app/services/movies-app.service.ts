import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesAppService {

  constructor(private http: HttpClient) { }

  getActors(){
    return this.http.get('../assets/mocks/actors.json').toPromise();
  }
}
