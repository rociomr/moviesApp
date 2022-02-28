import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {

  title: string;
  
  constructor(private router: Router, private translate: TranslateService) {
    this.title = "Movie App";
  }
}
