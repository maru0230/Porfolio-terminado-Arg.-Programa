import { Component, OnInit } from '@angular/core';
import { Programa } from 'src/app/data/Programa';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProgramaService } from 'src/app/servicios/programa.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

  programaList: Programa[] = [];
  isUserLogged: Boolean = false;

  programaForm:FormGroup;

 
  constructor(private programaService: ProgramaService,
    private authService: AuthService,
    private formBuilder:FormBuilder){
      this.programaForm=this.formBuilder.group(
        {
          id:[''],
          categoria:['', [Validators.required, Validators.minLength(15)]],
          porcentaje:['', [Validators.required, Validators.minLength(4)]],
          valorynombre:['', [Validators.required, Validators.minLength(4)]],
        });
    }
    

    ngOnInit(): void {
      this.isUserLogged = this.authService.isUserLogged();
      
      this.reloadData();
    }
  
    private reloadData() {
      this.programaService.obtenerDatosPrograma().subscribe(
        (data) => {
          this.programaList = data;
        }
      );
    }
  
  
    private clearForm(){
      this.programaForm.setValue({
        id:'',
        categoria:'',
        porcentaje:'',
        valorynombre:'',
        
    })
  }
    
    
  private loadForm(programa: Programa) {
    this.programaForm.setValue({
      id:programa.id,
      categoria: programa.categoria,
      porcentaje: programa.porcentaje,
      valorynombre: programa.valorynombre,
      
    })
  }
  
  onSubmit() {
    let programa: Programa = this.programaForm.value;
    if (this.programaForm.get('id')?.value == '') {
      this.programaService.guardarNuevaPrograma(programa).subscribe(
        (newPrograma: Programa) => {
          this.programaList.push(newPrograma);
        }
      );
    } else {
      this.programaService.modificarPrograma(programa).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
  
  onNewPrograma() {
    this.clearForm();
  }
  
  onEditPrograma(index: number) {
    let programa: Programa = this.programaList[index];
    this.loadForm(programa);
  }
  
  onDeletePrograma(index: number) {
    let programa: Programa = this.programaList[index];
    if (confirm("¿Está seguro que desea borrar el programa seleccionado?")) {
      this.programaService.borrarPrograma(programa.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
    }