import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/data/Habilidad';
import { AuthService } from 'src/app/servicios/auth.service';
import { HabilidadService } from 'src/app/servicios/habilidad.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidadList: Habilidad[] = [];
  isUserLogged: Boolean = false;

  habilidadForm:FormGroup;

 
  constructor(private habilidadService: HabilidadService,
    private authService: AuthService,
    private formBuilder:FormBuilder){
      this.habilidadForm=this.formBuilder.group(
        {
          id:[''],
          habilidad:['', [Validators.required, Validators.minLength(10)]],
          porcentaje:['', [Validators.required, Validators.minLength(4)]],
        });
    }
    

    ngOnInit(): void {
      this.isUserLogged = this.authService.isUserLogged();
      
      this.reloadData();
    }
  
    private reloadData() {
      this.habilidadService.obtenerDatosHabilidad().subscribe(
        (data) => {
          this.habilidadList = data;
        }
      );
    }
  
  
    private clearForm(){
      this.habilidadForm.setValue({
        id:'',
        habilidad:'',
        porcentaje:'',
        
    })
  }
    
    
  private loadForm(habilidad: Habilidad) {
    this.habilidadForm.setValue({
      id:habilidad.id,
      habilidad: habilidad.habilidad,
      porcentaje: habilidad.porcentaje,
      
    })
  }
  
  onSubmit() {
    let habilidad: Habilidad = this.habilidadForm.value;
    if (this.habilidadForm.get('id')?.value == '') {
      this.habilidadService.guardarNuevaHabilidad(habilidad).subscribe(
        (newHabilidad: Habilidad) => {
          this.habilidadList.push(newHabilidad);
        }
      );
    } else {
      this.habilidadService.modificarHabilidad(habilidad).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
  
  onNewHabilidad() {
    this.clearForm();
  }
  
  onEditHabilidad(index: number) {
    let habilidad: Habilidad = this.habilidadList[index];
    this.loadForm(habilidad);
  }
  
  onDeleteHabilidad(index: number) {
    let habilidad: Habilidad = this.habilidadList[index];
    if (confirm("¿Está seguro que desea borrar la habilidad seleccionada?")) {
      this.habilidadService.borrarHabilidad(habilidad.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
    }