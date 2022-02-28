import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title ="Home";
  constructor(private loadingService: LoadingService,) { }

  ngOnInit(): void {
    
    this.loadingService.showLoader();

  }

}
