import { Component, OnInit } from '@angular/core';
import { PhotoservicoService } from 'src/app/servicos/photoservico.service';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.css']
})
export class CarrosselComponent implements OnInit {

  images: any[];

  constructor(private photoServico: PhotoservicoService) { }

  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];


  ngOnInit() {
      this.photoServico.getImages().then(images => this.images = images);
  }

}
