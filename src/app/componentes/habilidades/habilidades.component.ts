import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/data/Habilidad';
import { AuthService } from 'src/app/servicios/auth.service';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidadList: Habilidad[] = [];
  isUserLogged: Boolean = false;

 
  constructor(private habilidadService: HabilidadService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.habilidadService.obtenerDatosHabilidad().subscribe(
      (data) => {
        this.habilidadList = data;
        console.log(data);
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

