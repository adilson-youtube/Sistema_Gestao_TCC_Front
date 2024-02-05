import { Injectable } from '@angular/core';
import { PhotorepositorioService } from '../repositorios/photorepositorio.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoservicoService {

  constructor(private repositorio: PhotorepositorioService) { }

  getImages(): Promise<Array<ImageBitmap>> {
    return this.repositorio.getImages();
  }

}
