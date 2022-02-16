import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { PagesComponent } from './pages.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
    //{ path: '', component: PagesComponent, children: 
    //    [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'form/:action', component: FormComponent },
            { path: 'detail/:id', component: DetailComponent }
    //    ]
    //},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { 
}
