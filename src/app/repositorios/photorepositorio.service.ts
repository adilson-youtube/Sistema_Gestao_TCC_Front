import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotorepositorioService {

  constructor(private http: HttpClient) { }

  getImages() {
  return this.http.get<any>('assets/data/photos.json')
    .toPromise()
    .then(res => <Array<ImageBitmap>>res.data)
    .then(data => { return data; });
  }
}
