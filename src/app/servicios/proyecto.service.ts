import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../data/Proyecto';
import { config } from '../data/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http: HttpClient) { }


  obtenerDatosProyecto():Observable<Proyecto[]>{
    return this.http.get<any>(config.BaseUrl + "ver/proyecto");
  }

  guardarNuevaProyecto(proyecto:Proyecto):Observable<Proyecto>{
    return this.http.post<any>(config.BaseUrl + "new/proyecto", proyecto);
  }

  
  modificarProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.put<any>(config.BaseUrl + "editar/proyecto", proyecto);
  }

  borrarProyecto(id: number): Observable<any> {
    return this.http.delete<any>(config.BaseUrl + "delete5/"+ id);
  }
}
