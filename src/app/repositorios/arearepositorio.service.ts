
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Area } from '../modelo/entidades/area';

@Injectable({
  providedIn: 'root'
})
export class AreaRepositorio {
  baseUrl: string;
  httpOptions: HttpHeaders = new HttpHeaders() 
  // .set('Content-Type', 'application/json') 
  // .set('Access-Control-Allow-Credentials', '*/*') 
  // .set('Accept', '*/*') 
  .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"));

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
    // console.log("Cabeçario da Requisição: "+JSON.stringify(this.httpOptions))
  }

  //--- Marcacão
  listarAreas(): Observable<Array<Area>> {
    const path = `Area`;
    return this.http.get<Array<Area>>(`${this.baseUrl}${path}`,  {headers: this.httpOptions, withCredentials: true});
  }

  procurarAreaPorId(id: number): Observable<Area> {
    const path = `Area/${id}`;
    return this.http.get<Area>(`${this.baseUrl}${path}`);
  }

  salvarArea(area: Area): Observable<Area> {
    const path = `Area`;
    return this.http.post<Area>(`${this.baseUrl}${path}`, area);
  }

  actualizarArea(id: number, area: Area): Observable<Area> {
    const path = `Area/${id}`;
    return this.http.put<Area>(`${this.baseUrl}${path}`, area);
  }

  eliminarArea(id: number): Observable<Area> {
    const path = `Area/${id}`;
    return this.http.delete<Area>(`${this.baseUrl}${path}`);
  }


}