import { Injectable } from '@angular/core';
import { GridfsRepositorio } from '../repositorios/gridfsrepositorio.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GridfsService {

  constructor(private repositorio: GridfsRepositorio) { }

  uploadFile(file: File): Observable<any> {
    return this.repositorio.uploadFile(file);
  }

  downloadFile(fileId: string): Observable<HttpResponse<Blob>> {
    return this.repositorio.downloadFile(fileId);
  }

  deleteFile(fileId: string): Observable<any> {
    return this.repositorio.deleteFile(fileId);
  }

  updateFile(fileId: string, file: File): Observable<any> {
    return this.repositorio.updateFile(fileId, file);
  }

}
