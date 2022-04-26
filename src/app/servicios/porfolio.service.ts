import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../data/Educacion';
import { config } from '../data/config/config';


@Injectable({
  providedIn: 'root'
})



export class PorfolioService {

  

  constructor(private http: HttpClient) { }
  
  obtenerDatosEducacion():Observable<Educacion[]>{
    return this.http.get<any>(config.BaseUrl + "ver/estudios");
  }

  guardarNuevaEducacion(educacion:Educacion):Observable<Educacion>{
    return this.http.post<any>(config.BaseUrl + "new/estudios", educacion);
  }

  
  modificarEducacion(educacion: Educacion): Observable<any> {
    return this.http.put<any>(config.BaseUrl + "editar/estudios", educacion);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any>(config.BaseUrl + "borrar/"+id);
  }

   
}