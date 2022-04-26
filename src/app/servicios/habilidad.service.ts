import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../data/Habilidad';


import { config } from '../data/config/config';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  constructor(private http: HttpClient) { }

  obtenerDatosHabilidad(): Observable<Habilidad[]> {
    return this.http.get<any>("http://localhost:8080/ver/habilidad");
  }
}
