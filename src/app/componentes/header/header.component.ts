import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/data/Persona';

import { AuthService } from 'src/app/servicios/auth.service';
import { HeaderService } from 'src/app/servicios/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  persona: Persona[] | undefined;
  header:any;
  isUserLogged: Boolean = false;

  constructor(
    private headerService: HeaderService,
    private authService: AuthService) {
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.headerService.obtenerDatosPersona().subscribe(
      (data:Persona[]) => {
        this.persona = data;
        console.log(this.persona);
      }
    );
  }

  onToogle(): void {
    console.log('toogle');
  }

  test(): void {
    console.log('test');
  }

}
