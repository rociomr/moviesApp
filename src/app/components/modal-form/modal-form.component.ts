import { Component, OnInit,  ElementRef, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, take, tap } from 'rxjs';
import { MoviesAppService} from '../../services/movies-app.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Movie } from 'src/app/shared/interfaces/data.interface';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
//  encapsulation: ViewEncapsulation.None,
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
 
  action: string;
  titleAction: string;
  invalidYear = false;
  invalidPunctuation: boolean;
  form: any;
  movieId:number;
  selectedMovie: any;
  selectedMovie2: Movie;
  nameActors: string[] = [];
  actorsList: any = [];
  studiosList: any = [];
  studio: string[];
  allStudios: string[] = [];

  constructor(private loadingService: LoadingService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private element: ElementRef, private moviesService: MoviesAppService){}

  ngOnInit() {
    this.loadingService.showLoader();
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
    this.selectedMovie = this.moviesService.getSelectedMovies();
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
    console.warn("this.selectedMovie.studio", this.selectedMovie.studio)
  }

  
  /**
   * Método que obtiene el listado de actores
   */
  getAllActors(){
    this.moviesService.getActorsList().then( data => {
      this.actorsList = data;
      this.loadingService.hideLoader();
    }, err => {
      this.router.navigate(['/not-found']);
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
    }, err => {
      this.router.navigate(['/not-found']);
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
      alert("Falta algún campo por rellenar");
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
      this.router.navigate(['/not-found']);
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
      this.router.navigate(['/not-found']);
    })
  }

  validateInput(){
    if(this.form.value.year < 1900) {
      this.invalidYear = true;
    }
    if(this.form.punctuation < 1 || this.form.punctuation > 10){
      this.invalidPunctuation = true;
    }
  }

}

