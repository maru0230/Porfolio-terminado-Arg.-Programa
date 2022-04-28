import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idioma } from '../data/Idioma';
import { config } from '../data/config/config';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  constructor(private http: HttpClient) { }

  obtenerDatosIdioma():Observable<Idioma[]>{
    return this.http.get<any>(config.BaseUrl + "ver/idioma");
  }

  guardarNuevaIdioma(idioma:Idioma):Observable<Idioma>{
    return this.http.post<any>(config.BaseUrl + "new/idioma", idioma);
  }

  
  modificarIdioma(idioma: Idioma): Observable<any> {
    return this.http.put<any>(config.BaseUrl + "editar/idioma", idioma);
  }

  borrarIdioma(id: number): Observable<any> {
    return this.http.delete<any>(config.BaseUrl + "delete3/"+ id);
  }

}
