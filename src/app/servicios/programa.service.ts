import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Programa } from '../data/Programa';
import { config } from '../data/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(private http: HttpClient) { }


  obtenerDatosPrograma():Observable<Programa[]>{
    return this.http.get<any>(config.BaseUrl + "ver/programa");
  }

  guardarNuevaPrograma(programa:Programa):Observable<Programa>{
    return this.http.post<any>(config.BaseUrl + "new/programa", programa);
  }

  
  modificarPrograma(programa: Programa): Observable<any> {
    return this.http.put<any>(config.BaseUrl + "editar/programa", programa);
  }

  borrarPrograma(id: number): Observable<any> {
    return this.http.delete<any>(config.BaseUrl + "delete4/"+ id);
  }
}
