import { Component, OnInit } from '@angular/core';
import { Idioma } from 'src/app/data/Idioma';
import { AuthService } from 'src/app/servicios/auth.service';
import { IdiomaService } from 'src/app/servicios/idioma.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {

  idiomaList: Idioma[] = [];
  isUserLogged: Boolean = false;

  idiomaForm:FormGroup;

 
  constructor(private idiomaService: IdiomaService,
    private authService: AuthService,
    private formBuilder:FormBuilder){
      this.idiomaForm=this.formBuilder.group(
        {
          id:[''],
          idioma:['', [Validators.required, Validators.minLength(10)]],
          porcentaje:['', [Validators.required, Validators.minLength(4)]],
          valor:['', [Validators.required, Validators.minLength(4)]],
        });
    }
    

    ngOnInit(): void {
      this.isUserLogged = this.authService.isUserLogged();
      
      this.reloadData();
    }
  
    private reloadData() {
      this.idiomaService.obtenerDatosIdioma().subscribe(
        (data) => {
          this.idiomaList = data;
        }
      );
    }
  
  
    private clearForm(){
      this.idiomaForm.setValue({
        id:'',
        idioma:'',
        porcentaje:'',
        valor:'',
        
    })
  }
    
    
  private loadForm(idioma: Idioma) {
    this.idiomaForm.setValue({
      id:idioma.id,
      idioma: idioma.idioma,
      porcentaje: idioma.porcentaje,
      valor: idioma.valor,
      
    })
  }
  
  onSubmit() {
    let idioma: Idioma = this.idiomaForm.value;
    if (this.idiomaForm.get('id')?.value == '') {
      this.idiomaService.guardarNuevaIdioma(idioma).subscribe(
        (newIdioma: Idioma) => {
          this.idiomaList.push(newIdioma);
        }
      );
    } else {
      this.idiomaService.modificarIdioma(idioma).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
  
  onNewIdioma() {
    this.clearForm();
  }
  
  onEditIdioma(index: number) {
    let idioma: Idioma = this.idiomaList[index];
    this.loadForm(idioma);
  }
  
  onDeleteIdioma(index: number) {
    let idioma: Idioma = this.idiomaList[index];
    if (confirm("¿Está seguro que desea borrar el idioma seleccionado?")) {
      this.idiomaService.borrarIdioma(idioma.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
    }