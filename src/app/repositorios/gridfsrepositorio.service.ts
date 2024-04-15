import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GridfsRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  uploadFile(file: File): Observable<any> {
    const path = `GridFS/upload`;
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseUrl}${path}`, formData);
  }

  downloadFile(fileId: string): Observable<HttpResponse<Blob>> {
    const path = `GridFS/download/${fileId}`;
    return this.http.get(`${this.baseUrl}${path}`, { observe: 'response', responseType: 'blob' });
  }

  deleteFile(fileId: string): Observable<any> {
    const path = `GridFS/delete/${fileId}`;
    return this.http.delete(`${this.baseUrl}${path}`);
  }

  updateFile(fileId: string, file: File): Observable<any> {
    const path = `GridFS/update/${fileId}`;
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<any>(`${this.baseUrl}${path}`, formData);
  }

}
