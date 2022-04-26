import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Experiencia } from 'src/app/data/Experiencia';
import { AuthService } from 'src/app/servicios/auth.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  educacionList: Experiencia[] = [];
  isUserLogged: Boolean = false;

  experienciaList:any;
  constructor(private experienciaService: ExperienciaService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.experienciaService.obtenerDatosExperiencia().subscribe(
      (data) => {
        this.experienciaList = data;
        console.log(data);
      }
    );
    }
  }
