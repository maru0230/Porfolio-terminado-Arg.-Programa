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

  obtenerDatosHabilidad():Observable<Habilidad[]>{
    return this.http.get<any>(config.BaseUrl + "ver/habilidad");
  }

  guardarNuevaHabilidad(habilidad:Habilidad):Observable<Habilidad>{
    return this.http.post<any>(config.BaseUrl + "new/habilidad", habilidad);
  }

  
  modificarHabilidad(habilidad: Habilidad): Observable<any> {
    return this.http.put<any>(config.BaseUrl + "editar/habilidad", habilidad);
  }

  borrarHabilidad(id: number): Observable<any> {
    return this.http.delete<any>(config.BaseUrl + "delete2/"+ id);
  }

}
