import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../data/config/config';
import { Observable } from 'rxjs';
import { Acerca } from '../data/Acerca';

@Injectable({
  providedIn: 'root'
})
export class AcercaService {

  constructor(private http: HttpClient) { }

  obtenerDatosAcerca():Observable<Acerca[]>{
    return this.http.get<any>(config.BaseUrl + "ver/acerca");
  }

  guardarNuevaAcerca(acerca:Acerca):Observable<Acerca>{
  return this.http.post<any>(config.BaseUrl + "new/acerca", acerca);
 }

  
  modificarAcerca(acerca: Acerca): Observable<any> {
    return this.http.put<any>(config.BaseUrl + "editar/acerca", acerca);
  }

borrarAcerca(id: number): Observable<any> {
   return this.http.delete<any>(config.BaseUrl + "anular/"+ id);
 }


  

  
}
