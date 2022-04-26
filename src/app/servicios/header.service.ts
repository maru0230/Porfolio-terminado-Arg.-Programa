import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../data/Persona';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  public obtenerDatosPersona(): Observable<Persona[]> {
    return this.http.get<Persona[]>("http://localhost:8080/ver/persona");
  }

}