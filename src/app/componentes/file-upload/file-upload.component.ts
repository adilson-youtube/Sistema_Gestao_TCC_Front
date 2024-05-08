import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GridfsService } from 'src/app/servicos/gridfs.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileId: string = "";

  constructor(private gridfsService: GridfsService) { }

  ngOnInit(): void { }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.gridfsService.uploadFile(file).subscribe(
      response => {
        console.log('Ficheiro enviado com sucesso:', response);
      },
      error => {
        console.error('Id do Ficheiro:', error.error.text);
        console.error('Erro ao enviar o ficheiro:', error);
      }
    );
  }

  // downloadFile2(fileId: string) {
  //   this.gridfsService.downloadFile(fileId).subscribe(
  //     response => {
        // const a = document.createElement('a');
        // const blob = new Blob([response], { type: 'application/octet-stream' });
        // a.href = URL.createObjectURL(blob);
        // a.download = blob.type;
  //       console.log("O tipo de ficheiro é: "+response.stream);
  //       const blob = new Blob([response], { type: 'application/octet-stream' });
  //       const url = window.URL.createObjectURL(blob);
  //       window.open(url);
  //     },
  //     error => {
  //       console.error('Erro ao baixar o ficheiro:', error);
  //     }
  //   );
  // }

  downloadFile(fileId: string) {
    this.gridfsService.downloadFile(fileId).subscribe(
      (response: HttpResponse<Blob> | HttpErrorResponse) => {
        if (response instanceof HttpResponse) {
          const contentDispositionHeader = response.headers.get('Content-Disposition');
          const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = fileNameRegex.exec(contentDispositionHeader);
          const fileName = matches != null && matches[1] ? matches[1].replace(/['"]/g, '') : 'downloadedFile';

          console.log("Conteudo do Cabeçario: "+JSON.stringify(response.headers.keys()))

          const blob = new Blob([response.body], { type: response.headers.get('Content-Type') });

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } else {
          console.error('Error downloading file:', response.error);
        }
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
  }

  deleteFile(fileId: string) {
    this.gridfsService.deleteFile(fileId).subscribe(
      response => {
        console.log('Ficheiro apagado com sucesso');
      },
      error => {
        console.error('Erro ao apagar o ficheiro:', error);
      }
    );
  }

  updateFile(event: any, fileId: string) {
    const file = event.target.files[0];
    this.gridfsService.updateFile(fileId, file).subscribe(
      response => {
        console.log('Ficheiro actualizado com sucesso:', response);
      },
      error => {
        console.error('Erro ao actualizar o ficheiro:', error);
      }
    );
  }

}
