import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable, take, tap } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MoviesAppService} from '../../services/movies-app.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Movie } from 'src/app/shared/interfaces/data.interface';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
 
  action: string;
  titleAction: string;
  punctuation = 3;
  form: any;
  movieId:number;
  selectedMovie: any;
  selectedMovie2: Movie;
  nameActors: string[] = [];
  actorsList: any = [];
  studiosList: any = [];
  studio: string[];
  allStudios: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private element: ElementRef, private moviesService: MoviesAppService){}

  ngOnInit() {
    this.route.params.pipe(
      take(1),
      tap(({action, id})  => {
        this.action = action;
        this.movieId = id;
        if(this.action === 'edit'){
         this.editMovieInfo();
        }else if(this.action === 'add'){
          this.addMovieInfo();
        }
    })).subscribe();
    this.getAllActors();
    this.getAllStudioNames();
  }

  addMovieInfo(){
    this.titleAction = 'Nueva película';
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      poster: [''],
      genres: ['', Validators.required],
      studio: ['', Validators.required],
      year: ['', Validators.required],
      duration: ['', Validators.required],
      punctuation: ['', Validators.required],
      actors:['',Validators.required]
    });
  }

  editMovieInfo(){
    this.titleAction = 'Editar película';
   // this.moviesService.getActorsList().then( data => {
    //  this.actorsList = data;
      /*if(this.actorsList.length > 0){
        console.log("this.actorlist", this.actorsList)
        this.nameActors = this.moviesService.getNamesActorsMovieSelected(this.actorsList, 2);
        console.log("nameActors", this.nameActors)
      }*/
     // this.moviesService.getSelectedMovie(this.movieId).then((data:any) =>{
       // this.selectedMovie = data;
       // console.log("this.selectedMovie2", this.selectedMovie)
        /*this.moviesService.getActorsList().then( data => {
          this.actorsList = data;
          let dataActors = this.moviesService.getNamesActorsMovieSelected(this.actorsList, this.selectedMovie);
          let numActors = dataActors.filter(num => typeof num == 'number')
          this.nameActors = dataActors.filter(actor => typeof actor == 'string')
          console.log("numActors", numActors)
        })*/
        this.selectedMovie = this.moviesService.getSelectedMovies();
        console.warn("this.selectedMovie.studio", this.selectedMovie.studio)
        this.form = this.formBuilder.group({
          title: [this.selectedMovie.title, Validators.required],
          poster: [this.selectedMovie.poster],
          genres: [this.selectedMovie.genre, Validators.required],
          studio: [this.selectedMovie.studio, Validators.required],
          year: [this.selectedMovie.year, Validators.required],
          duration: [this.selectedMovie.duration, Validators.required],
          punctuation: [this.selectedMovie.imdbRating, Validators.required],
          actors:[this.selectedMovie.actors,Validators.required]
        });

      
    //  });
      
    
      
   // });
    
  }

  
  /**
   * Método que obtiene el listado de actores
   */
  getAllActors(){
    this.moviesService.getActorsList().then( data => {
      this.actorsList = data;
    });
  }

  getAllMovies(){
    this.moviesService.getMoviesList();
  }


  /**
   * Método que obtiene el listado de estudios 
   */
  getAllStudioNames(){
    this.moviesService.getStudiosList().then( data => {
      this.studiosList = data;
      
    });
  }
 
  
  submit() {
    if (this.form.valid) {
      if(this.action == 'add'){
        this.addMovie();
      }else if(this.action == 'edit'){
        this.editMovie();
      }
    }
    else{
      alert("FILL ALL FIELDS");
     console.log('this.form.value.title',this.form.value.title)
     console.log('this.form.value.poster', this.form.value.poster)
     console.log('this.form.value.genres',this.form.value.genres)
     console.log('this.form.value.studio',this.form.value.studio)
     console.log('this.form.value.year',this.form.value.year)
     console.log('this.form.value.duration',this.form.value.duration)
     console.log('this.form.value.punctuation',this.form.value.punctuation)
     console.log('this.form.value.actors',this.form.value.actors)
    
    }
  }

  addMovie(){
    let movie;
    movie = {
      "id": this.moviesService.getNextID(),
      "title": this.form.value.title,
      "poster": this.form.value.poster,
      "genre": [this.form.value.genres],
      "year": this.form.value.year,
      "duration": this.form.value.duration,
      "imdbRating": this.form.value.punctuation,
      "actors": this.form.value.actors
    }
    this.moviesService.addMovie(movie)
    .subscribe(data => {
      this.getAllMovies();
      this.router.navigate(['/home']);
    },error =>{

    })
  }

  editMovie(){
    let movie;
    movie = {
      "id": this.movieId,
      "title": this.form.value.title,
      "poster": this.form.value.poster,
      "genre": [this.form.value.genres],
      "year": this.form.value.year,
      "duration": this.form.value.duration,
      "imdbRating": this.form.value.punctuation,
      "actors": this.form.value.actors
    }
    this.moviesService.editMovie(movie)
    .subscribe(data => {
      console.log("data", data)
      this.getAllMovies();
      this.router.navigate(['/home']);
    },error =>{

    })
  }

}

