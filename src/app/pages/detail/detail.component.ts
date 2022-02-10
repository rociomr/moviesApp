import { Component, OnInit } from '@angular/core';
import { MoviesAppService } from 'src/app/services/movies-app.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  selectedMovie: any;

  constructor(private moviesSevice: MoviesAppService) { }

  ngOnInit(): void {
    this.selectedMovie = this.moviesSevice.getSelectedMovie();
    console.log("this.selectedMovie", this.selectedMovie)
  }

}
