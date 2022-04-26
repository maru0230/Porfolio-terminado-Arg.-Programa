import { Component, OnInit } from '@angular/core';
import { Acerca } from 'src/app/data/Acerca';
import { AuthService } from 'src/app/servicios/auth.service';
import { AcercaService } from 'src/app/servicios/acerca.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  acercaList: Acerca[] = [];
  isUserLogged: Boolean = false;

  acercaForm:FormGroup;

  constructor(
    private acercaService: AcercaService,
    private authService: AuthService,
    private formBuilder:FormBuilder){
      this.acercaForm=this.formBuilder.group(
        {
          id:[''],
          texto:['', [Validators.required,]],
        });
    }

    ngOnInit(): void {
      this.isUserLogged = this.authService.isUserLogged();
      
      this.reloadData();
    }
  
    private reloadData() {
      this.acercaService.obtenerDatosAcerca().subscribe(
        (data) => {
          this.acercaList = data;
        }
      );
    }
  
  
    private clearForm(){
      this.acercaForm.setValue({
        id:'',
        texto:'',
      })
  }
    
    
  private loadForm(acerca: Acerca) {
    this.acercaForm.setValue({
      id: acerca.id,
      texto: acerca.texto,
    })
  }
  
  onSubmit() {
    let acerca: Acerca = this.acercaForm.value;
    if (this.acercaForm.get('id')?.value == '') {
      this.acercaService.guardarNuevaAcerca(acerca).subscribe(
        (newAcerca: Acerca) => {
          this.acercaList.push(newAcerca);
        }
      );
    } else {
      this.acercaService.modificarAcerca(acerca).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
  
  onNewAcerca() {
    this.clearForm();
  }
  
  onEditAcerca(index: number) {
    let acerca: Acerca = this.acercaList[index];
    this.loadForm(acerca);
  }
  
  //onDeleteAcerca(index: number) {
   // let acerca: Acerca = this.acercaList[index];
    //if (confirm("¿Está seguro que desea borrar el texto seleccionado?")) {
      //this.acercaService.borrarAcerca(acerca.id).subscribe(
        //() => {
          //this.reloadData();
        //}
      //)
   // }
  //}
  
 // }
}