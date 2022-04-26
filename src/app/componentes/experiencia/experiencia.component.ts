import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/data/Experiencia';
import { AuthService } from 'src/app/servicios/auth.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList: Experiencia[] = [];
  isUserLogged: Boolean = false;

  experienciaForm:FormGroup;

  constructor(
    private experienciaService: ExperienciaService,
    private authService: AuthService,
    private formBuilder:FormBuilder){
      this.experienciaForm=this.formBuilder.group(
        {
          id:[''],
          position:['', [Validators.required, Validators.minLength(10)]],
          company:['', [Validators.required, Validators.minLength(10)]],
          img:['', [Validators.required,]],
          mode:['', [Validators.required, Validators.minLength(10)]],
          start:['', [Validators.required, Validators.minLength(4)]],
          end:['', [Validators.required, Validators.minLength(4)]],
          timeElapsed:['', [Validators.required, Validators.minLength(4)]],
        });
    }
    
   

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.experienciaService.obtenerDatosExperiencia().subscribe(
      (data) => {
        this.experienciaList = data;
      }
    );
  }


  private clearForm(){
    this.experienciaForm.setValue({
      id:'',
      position:'',
      company:'',
      img:'',
      mode:'',
      start:'',
      end:'',
      timeElapsed:'',
  })
}
  
  
private loadForm(experiencia: Experiencia) {
  this.experienciaForm.setValue({
    id: experiencia.id,
    position: experiencia.position,
    company: experiencia.company,
    img: experiencia.img,
    mode: experiencia.mode,
    start: experiencia.start,
    end: experiencia.end,
    timeElapsed: experiencia.timeElapsed
  })
}

onSubmit() {
  let experiencia: Experiencia = this.experienciaForm.value;
  if (this.experienciaForm.get('id')?.value == '') {
    this.experienciaService.guardarNuevaExperiencia(experiencia).subscribe(
      (newExperiencia: Experiencia) => {
        this.experienciaList.push(newExperiencia);
      }
    );
  } else {
    this.experienciaService.modificarExperiencia(experiencia).subscribe(
      () => {
        this.reloadData();
      }
    )
  }
}

onNewExperiencia() {
  this.clearForm();
}

onEditExperiencia(index: number) {
  let experiencia: Experiencia = this.experienciaList[index];
  this.loadForm(experiencia);
}

onDeleteExperiencia(index: number) {
  let experiencia: Experiencia = this.experienciaList[index];
  if (confirm("¿Está seguro que desea borrar la experiencia seleccionada?")) {
    this.experienciaService.borrarExperiencia(experiencia.id).subscribe(
      () => {
        this.reloadData();
      }
    )
  }
}
  }
