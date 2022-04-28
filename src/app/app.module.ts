import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { HeaderComponent } from './componentes/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './componentes/auth/login/login.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { EditarAcercaComponent } from './acerca-de/editar-acerca.component';
import { IdiomasComponent } from './componentes/idiomas/idiomas.component';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    AcercaDeComponent,
    EducacionComponent,
    ExperienciaComponent,
    LoginComponent,
    PorfolioComponent,
    HabilidadesComponent,
    EditarAcercaComponent,
    IdiomasComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
