import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/data/Persona';
import { AuthService } from 'src/app/servicios/auth.service';
import { HeaderService } from 'src/app/servicios/header.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  personaList: Persona[] = [];
  isUserLogged: Boolean = false;

  personaForm:FormGroup;

 
  constructor(private headerService: HeaderService,
    private authService: AuthService,
    private formBuilder:FormBuilder){
      this.personaForm=this.formBuilder.group(
        {
          id:[''],
          name:['', [Validators.required]],
          image:['', [Validators.required]],
          position:['', [Validators.required]],
          ubication:['', [Validators.required]],
          company:['', [Validators.required]],
          img:['', [Validators.required]],
          url:['', [Validators.required]],
          school:['', [Validators.required]],
          img2:['', [Validators.required]],
          url2:['', [Validators.required]],


        });
    }
    

    ngOnInit(): void {
      this.isUserLogged = this.authService.isUserLogged();
      
      this.reloadData();
    }
  
    private reloadData() {
      this.headerService.obtenerDatosPersona().subscribe(
        (data) => {
          this.personaList = data;
        }
      );
    }
  
  
    private clearForm(){
      this.personaForm.setValue({
        id:'',
        name:'', 
        image:'',
        position:'', 
        ubication:'',
        company:'',
        img:'',
        url:'',
        school:'',
        img2:'',
        url2:'',
        
    })
  }
    
    
  private loadForm(persona: Persona) {
    this.personaForm.setValue({
      id:persona.id,
      name: persona.name,
      image: persona.image,
      position: persona.position,
      ubication: persona.ubication,
      company: persona.company,
      img: persona.img,
      url: persona.url,
      school: persona.school,
      img2: persona.img2,
      url2: persona.url2,
      
    })
  }
  
  onSubmit() {
    let persona: Persona = this.personaForm.value;
    if (this.personaForm.get('id')?.value == '') {
      this.headerService.guardarNuevaPersona(persona).subscribe(
        (newPersona: Persona) => {
          this.personaList.push(newPersona);
        }
      );
    } else {
      this.headerService.modificarPersona(persona).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
  
  onNewPersona() {
    this.clearForm();
  }
  
  onEditPersona(index: number) {
    let persona: Persona = this.personaList[index];
    this.loadForm(persona);
  }
  
  onDeletePersona(index: number) {
    let persona: Persona = this.personaList[index];
    if (confirm("¿Está seguro que desea borrar los datos de la persona seleccionada?")) {
      this.headerService.borrarPersona(persona.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
    }