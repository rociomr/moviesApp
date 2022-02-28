import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moviesApp';
  selectedLanguage = 'es';
  private idiomas: Array<string>;

  constructor(private translate: TranslateService){
    this.translate.setDefaultLang(this.selectedLanguage);
      this.translate.use(this.selectedLanguage);
  }

  selectLanguage(lang: string) {
    this.translate.use(lang);
}
}
