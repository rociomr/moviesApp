import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { MoviesAppService} from '../../services/movies-app.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  form;
  invert = false;
  punctuation = 1;
  actorsList: any = [];
  studiosList: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  studioCtrl = new FormControl();
  filteredStudios: Observable<string[]>;
  studios: string[] = ['Ejemplo'];
  allStudios: string[] = [];
  actorCtrl = new FormControl();
  filteredActors: Observable<string[]>;
  actors: string[] = ['Ejemplo'];
  allActors: string[] = [];
  disableSelect = new FormControl(false);

  @ViewChild('actorInput') actorInput!: ElementRef<HTMLInputElement>;
  constructor(private formBuilder: FormBuilder, private element: ElementRef, private moviesService: MoviesAppService){
    //this.filteredActors = this.actorCtrl.valueChanges;
    this.form = formBuilder.group({
      title: ['', Validators.required],
      poster: ['', Validators.required],
      genres: ['', Validators.required],
      actors: ['', Validators.required],
      studio: ['', Validators.required],
      year: ['', Validators.required],
      duration: ['', Validators.required],
      punctuation: [this.punctuation, Validators.required]
    });
  }
  ngOnInit() {
    console.warn("OnInit")
    // alert('hiii')
    this.moviesService.getActorsList().then( data => {
      console.log('actores', data);
      this.actorsList = data;
      if(this.actorsList){
        this.getNamesActors();
        this.filteredActors = this.actorCtrl.valueChanges.pipe(
          startWith(null),
          map((actor: string | null) => (actor ? this._filter(actor) : this.allActors.slice())),
        );
      }
    });

    this.moviesService.getStudiosList().then( data => {
      console.log('actores', data);
      this.studiosList = data;
      if(this.studiosList){
        this.getStudiosList();
        this.filteredStudios = this.studioCtrl.valueChanges.pipe(
          startWith(null),
          map((studio: string | null) => (studio ? this._filter(studio) : this.allStudios.slice())),
        );
      }
    });

  }
  /**
  * Method gets all names of actors
  */
  getNamesActors() {
    let name, firstname, lastname;
    this.actorsList.forEach((actor: any) => {
      console.log(actor);
      firstname = actor.first_name;
      lastname = actor.last_name;
      name = firstname.concat(' ', lastname);
      this.allActors.push(name)
      console.warn('name', name);
      
    });
    console.warn('Actores: ', this.allActors);
  }

  /**
  * Method gets all names of studios
  */
   getStudiosList() {
    this.studiosList.forEach((studio: any) => {
      console.log(studio);
      this.allStudios.push(studio.name);      
    });
    console.warn('Estudios: ', this.allStudios);
  }
  
  
  submit() {
    if (this.form.valid) {
      console.log(this.form.value)
    }
    else{
      alert("FILL ALL FIELDS")
    }
  }

  /**
  * Method add actors
  * @param event 
  */
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our actor
    if (value) {
      this.actors.push(value);
    }

    // Clear the input value
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
    return this.allActors.filter(actor => actor.toLowerCase().includes(filterValue));
  }
}

