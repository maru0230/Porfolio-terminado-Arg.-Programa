import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/auth/login/login.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';

const routes: Routes = [
  {path: 'home', component: PorfolioComponent },
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch:'full' },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }