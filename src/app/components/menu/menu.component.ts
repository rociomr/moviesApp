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
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isExpanded = true;
  title: string;
  constructor(private router: Router, private translate: TranslateService) {
    this.title = "Movie App";
  }

  
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
