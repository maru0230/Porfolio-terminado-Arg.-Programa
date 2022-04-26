import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../data/Experiencia';
import { config } from '../data/config/config';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http: HttpClient) { }

  obtenerDatosExperiencia():Observable<Experiencia[]>{
    return this.http.get<any>(config.BaseUrl + "ver/experiencia");
  }

  guardarNuevaExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.post<any>(config.BaseUrl + "new/experiencia", experiencia);
  }

  
  modificarExperiencia(experiencia: Experiencia): Observable<any> {
    return this.http.put<any>(config.BaseUrl + "editar/experiencia", experiencia);
  }

  borrarExperiencia(id: number): Observable<any> {
    return this.http.delete<any>(config.BaseUrl + "eliminar/"+ id);
  }

  }