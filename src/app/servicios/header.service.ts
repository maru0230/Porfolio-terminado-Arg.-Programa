import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../data/Persona';
import { config } from '../data/config/config';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  obtenerDatosPersona():Observable<Persona[]>{
    return this.http.get<any>(config.BaseUrl + "ver/persona");
  }

  guardarNuevaPersona(persona:Persona):Observable<Persona>{
    return this.http.post<any>(config.BaseUrl + "new/persona", persona);
  }

  
  modificarPersona(persona: Persona): Observable<any> {
    return this.http.put<any>(config.BaseUrl + "editar/persona", persona);
  }

  borrarPersona(id: number): Observable<any> {
    return this.http.delete<any>(config.BaseUrl + "delete/"+ id);
  }


}