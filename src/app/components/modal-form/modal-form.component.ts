import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable, take, tap } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { MoviesAppService} from '../../services/movies-app.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  
  invert = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  studioCtrl = new FormControl();
  filteredStudios: Observable<string[]>;
  action: string;
  titleAction: string;
  punctuation = 3;
  form: any;
  nameActors: string[] = [];
  actorsList: any = [];
  studiosList: any = [];
  studio: string[];
  allStudios: string[] = [];
  actorCtrl = new FormControl();
  filteredActors: Observable<string[]>;
  actors: string[] = ['Ejemplo'];
  allActors: any = [];
  disableSelect = new FormControl(false);

  @ViewChild('actorInput') actorInput!: ElementRef<HTMLInputElement>;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private element: ElementRef, private moviesService: MoviesAppService){
   
  }
  ngOnInit() {
    
    this.route.params.pipe(
      take(1),
      tap(({action})  => {
        this.action = action;
     
        if(this.action === 'edit'){
         this.editMovieInfo();
        }else if(this.action === 'add'){
          this.addMovieInfo();
        }
      })).subscribe();

      this.getAllActorNames();
      this.getAllStudioNames();
    
    
  }

  addMovieInfo(){
    this.titleAction = 'Nueva película';
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      poster: [''],
      genres: ['', Validators.required],
      actors: ['', Validators.required],
      studio: ['', Validators.required],
      year: ['', Validators.required],
      duration: ['', Validators.required],
      punctuation: ['', Validators.required]
    });
  }

  editMovieInfo(){
    /*this.titleAction = 'Editar película';
    this.moviesService.getActorsList().then( data => {
      this.actorsList = data;
      if(this.actorsList.length > 0){
        console.log("this.actorlist", this.actorsList)
        this.nameActors = this.moviesService.getNamesActorsMovieSelected(this.actorsList, 2);
        console.log("nameActors", this.nameActors)
      }
      this.form = this.formBuilder.group({
        title: ['', Validators.required],
        poster: [''],
        genres: ['', Validators.required],
        actors: ['', Validators.required],
        studio: ['', Validators.required],
        year: ['', Validators.required],
        duration: ['', Validators.required],
        punctuation: [this.punctuation, Validators.required]
      });
    });*/
    
  }

  
  /**
   * Método que obtiene el listado de nombres de actores para mostrar chips
   */
   getAllActorNames(){
    this.moviesService.getActorsList().then( data => {
      this.actorsList = data;
      if(this.actorsList){
        this.allActors = this.moviesService.getNamesActors(this.actorsList);
        console.log("allACtors", this.allActors)
        this.filteredActors = this.actorCtrl.valueChanges.pipe(
          startWith(null),
          map((actor: string | null) => (actor ? this._filter(actor) : this.allActors.slice())),
        );
      }
    });
  }


  /**
   * Método que obtiene el listado de nombres de estudios para mostrar select
   */
  getAllStudioNames(){
    this.moviesService.getStudiosList().then( data => {
      this.studiosList = data;
      if(this.studiosList){
        this.allStudios = this.moviesService.getNameStudiosList(this.studiosList);
        this.filteredStudios = this.studioCtrl.valueChanges.pipe(
          startWith(null),
          map((studio: string | null) => (studio ? this._filter(studio) : this.allStudios.slice())),
        );
      }
    });
  }
 
  
  submit() {
    if (this.form.valid) {
      alert("OK")
      let movie = {
        "id": 11,
        "title": this.form.value.title,
        "poster": this.form.value.poster,
        "genre": [this.form.value.genres],
        "year": this.form.value.year,
        "duration": this.form.value.duration,
        "imdbRating": this.form.value.punctuation,
        "actors": this.actors
    }
      this.moviesService.addMovie(movie);
      this.moviesService.addMovie(movie)
      .subscribe(data => {
        console.log("dataaaaaaa", data)
        //this.refreshPeople();
      }) 
      
    }
    else{
      console.log('this.form.value.title',this.form.value.title)
      console.log('this.form.value.poster', this.form.value.poster)
      console.log('this.form.value.genres',this.form.value.genres)
      console.log('this.form.value.actors',this.actors)
      console.log('this.form.value.studio',this.form.value.studio)
      console.log('this.form.value.year',this.form.value.year)
      console.log('this.form.value.duration',this.form.value.duration)
      console.log('this.form.value.punctuation',this.form.value.punctuation)
      alert("FILL ALL FIELDS")
    }
  }


  /**
  * Method add actors
  * @param event 
  */
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Añade actor
    if (value) {
      this.actors.push(value);
    }

    // Limpia el valor del input
    event.chipInput!.clear();

    this.actorCtrl.setValue(null);
  }

  /**
   * Method remove actor
   * @param actor 
   */ 
  remove(actor: string): void {
    const index = this.actors.indexOf(actor);

    if (index >= 0) {
      this.actors.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.actors.push(event.option.viewValue);
    this.actorInput.nativeElement.value = '';
    this.actorCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allActors.filter((actor:any) => actor.toLowerCase().includes(filterValue));
  }
}

