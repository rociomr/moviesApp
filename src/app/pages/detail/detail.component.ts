import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesAppService } from 'src/app/services/movies-app.service';
import { Observable, take, tap } from 'rxjs';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  selectedMovie: any;
  form: any;
  movieId: number;
  movie$: Observable<any>;
  movieData: any;
  studio: string;
  actorsList: any;
  studiosList: any;
  nameActors: string[] = [];
  _movieDataSubscription: Subscription;

  constructor(public dialog: MatDialog, private loadingService: LoadingService, private moviesService: MoviesAppService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadingService.showLoader();
    this.route.params.pipe(
      take(1),
      tap(({id})  => {
        this.movieId = parseInt(id);
      }))
    .subscribe();
    
    //Cargamos los datos necesarios para mostrar los datos del detalle de la pelicula seleccionada
    this.moviesService.getSelectedMovie(this.movieId).then((data:any) =>{
      this.selectedMovie = data;
console.log("this.sesfsdfsdf", data)
      this.moviesService.getActorsList().then( data => {
        this.actorsList = data;
        let dataActors = this.moviesService.getNamesActorsMovieSelected(this.actorsList, this.selectedMovie);
       // let numActors = dataActors.filter(num => typeof num == 'number')
        this.nameActors = dataActors.filter(actor => typeof actor == 'string')
        this.loadingService.hideLoader();
      }, err => {
        this.router.navigate(['/not-found']);
      })
      this.moviesService.getStudioMovieSelected(this.selectedMovie);
    });
  }

  /**
   * Método para abrir el modal al pulsar el botón borrar
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: {selectedMovie: this.selectedMovie},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}

@Component({
  selector: 'dialog-overview',
  templateUrl: './dialog-overview.html',
  styleUrls: ['./detail.component.scss']
})
export class DialogOverviewExampleDialog {
  selectedMovie: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private moviesService: MoviesAppService, private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeMovie(movieId: any){
   this.moviesService.removeMovie(movieId).subscribe( data => {
    console.log("datae borrar", data )
    this.moviesService.getMoviesList();
    this.dialogRef.close();
    this.router.navigate(['/home']);
   }, err => {
    this.router.navigate(['/not-found']);
   })
    
  }
}
