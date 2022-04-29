import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/data/Proyecto';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyectoList: Proyecto[] = [];
  isUserLogged: Boolean = false;

  proyectoForm:FormGroup;

 
  constructor(private proyectoService: ProyectoService,
    private authService: AuthService,
    private formBuilder:FormBuilder){
      this.proyectoForm=this.formBuilder.group(
        {
          id:[''],
          name:['', [Validators.required, Validators.minLength(10)]],
          descripcion:['', [Validators.required, Validators.minLength(20)]],
        });
    }
    

    ngOnInit(): void {
      this.isUserLogged = this.authService.isUserLogged();
      
      this.reloadData();
    }
  
    private reloadData() {
      this.proyectoService.obtenerDatosProyecto().subscribe(
        (data) => {
          this.proyectoList = data;
        }
      );
    }
  
  
    private clearForm(){
      this.proyectoForm.setValue({
        id:'',
        name:'',
        descripcion:'',
        
    })
  }
  private loadForm(proyecto: Proyecto) {
    this.proyectoForm.setValue({
      id:proyecto.id,
      name: proyecto.name,
      descripcion: proyecto.descripcion,
      
    })
  }
  
  onSubmit() {
    let proyecto: Proyecto = this.proyectoForm.value;
    if (this.proyectoForm.get('id')?.value == '') {
      this.proyectoService.guardarNuevaProyecto(proyecto).subscribe(
        (newProyecto: Proyecto) => {
          this.proyectoList.push(newProyecto);
        }
      );
    } else {
      this.proyectoService.modificarProyecto(proyecto).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
  
  onNewProyecto() {
    this.clearForm();
  }
  
  onEditProyecto(index: number) {
    let proyecto: Proyecto = this.proyectoList[index];
    this.loadForm(proyecto);
  }
  
  onDeleteProyecto(index: number) {
    let proyecto: Proyecto = this.proyectoList[index];
    if (confirm("¿Está seguro que desea borrar el proyecto seleccionado?")) {
      this.proyectoService.borrarProyecto(proyecto.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
    }