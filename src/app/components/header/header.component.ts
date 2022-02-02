import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  

  @Output("action") public actionEventEmitter = new EventEmitter<any>();

  constructor() {}
}