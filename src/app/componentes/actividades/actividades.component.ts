import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isDefined } from '@angular/compiler/src/util';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { TFC } from 'src/app/modelo/entidades/tfc';
import { Tarefa } from 'src/app/modelo/entidades/tarefa';
import { EstadoTarefa } from 'src/app/modelo/enumerados/estadoTarefa';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AreaService } from 'src/app/servicos/area.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { CandidatoServico } from 'src/app/servicos/candidatoservico.service';
import { GridfsService } from 'src/app/servicos/gridfs.service';
import { OrgaoServico } from 'src/app/servicos/orgaoservico.service';
import { ProfessorService } from 'src/app/servicos/professor.service';
import { TFCService } from 'src/app/servicos/tfc.service';
import { TarefaService } from 'src/app/servicos/tarefa.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  nova = true;
  exibirAddTarefa = false;
  exibirAnexarFicheiro = false;
  exibirBaixarCorrecao = false;
  anexouFicheiro = false;
  validar: boolean;
  parametro: string;
  //dadosDeUso: DadosDeUso;
  exibirDetalhes = false;
  tarefa: Tarefa = new Tarefa();
  tarefas: Array<Tarefa>;
  // tfc = new TFC();
  // tfcs: Array<TFC>;
  estadoTarefa: boolean;
  dataEntrega: Date;
  dataTerminada: Date;
  checkboxEstado: boolean;
  // tarefaHeader: string = "Concluir Tarefa";
  
  userInfo: any;
  idTFC: number;

  estadoTarefaSelecionado: EstadoTarefa;

  estadoTarefas: any[] = [
    { name: 'Pendente', code: 0 },
    { name: 'Afazer', code: 1 },
    { name: 'Atrasado', code: 2 },
    { name: 'Concluido', code: 3 }
  ];


  @Input()
  showMenu: boolean = true;
  @Input()
  showHeader: boolean = true;

  showlogin: boolean = false;
  showAllMenu: boolean = false;
  showregister: boolean = false;
  
  deviceXs: boolean;
  deviceSm: boolean;
  deviceMd: boolean;
  deviceLg: boolean;
  mediaSub: Subscription;
  translation = new Traducao;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private config: PrimeNGConfig,
    public mediaObserver: MediaObserver,
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService,
    private tarefaServico: TarefaService,
    private tfcServico: TFCService,
    private gridfsService: GridfsService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) {  

    this.getInfoUser();

    if (this.isRole("Estudante")) {
      const id = Number(this.userInfo.id);
      this.tarefaServico.listarTarefasEstudante(id).subscribe( resultados => { 
        this.tarefas = resultados;
      });
    }

    if(this.isRole("Professor") || this.isRole("Coordenador")) {
      if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras 
      && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.id) {
        this.idTFC = Number(this.router.getCurrentNavigation().extras.state.id);

        console.log("O id do TFC é "+this.router.getCurrentNavigation().extras.state.id);
        this.tarefaServico.listarTarefasTFC(this.idTFC).subscribe( resultados => { 
          this.tarefas = resultados;
        });
        
      } else {
        console.log("Chegou até no else ");
        this.router.navigateByUrl("PropostaReservada");
      }
    }

  }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();


    this.authenticationService.showMenuEmitter.subscribe( show => this.showAllMenu = show );
    this.authenticationService.showRegisterEmitter.subscribe( register => this.showregister = register );
    this.authenticationService.showLoginEmitter.subscribe( login => this.showlogin = login );
    
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
        this.deviceSm = result.mqAlias === 'sm' ? true : false;
        this.deviceMd = result.mqAlias === 'md' ? true : false;
        this.deviceLg = result.mqAlias === 'lg' ? true : false;
    });

    this.config.setTranslation(this.translation.translation);

  }
  

  get cabecario(): string {
    return this.tarefa?.id ? 'Editar Actividade' : 'Adicionar Actividade';
  }

  get tarefaHeader(): string {
    return "Concluir Tarefa";
  }

  get visualizarCorrecaoHeader(): string {
    return "Correção da Tarefa";
  }


  modal(tarefa?: Tarefa): void {
    // this.tarefaServico.procurarTarefaPorCodigo(tarefa.codigoDoCandidato).subscribe( resultado => { this.tarefa = resultado; }); 
    this.tarefa = tarefa;
    if (tarefa.dataEntrega) {
      this.dataEntrega = new Date(tarefa.dataEntrega);
    }
    if (tarefa.dataTerminada) {
      this.dataTerminada = new Date(tarefa.dataTerminada);
    }
    
    // console.log("Dados da Tarefa: "+JSON.stringify(tarefa));
    this.exibirAddTarefa = true;
    this.validar = false;
  }


  modalAnexarFicheiro(tarefa?: Tarefa): void {
    // this.tarefaServico.procurarTarefaPorCodigo(tarefa.codigoDoCandidato).subscribe( resultado => { this.tarefa = resultado; }); 
    this.tarefa = tarefa;
    if (tarefa?.dataEntrega) {
      this.dataEntrega = new Date(tarefa.dataEntrega);
    }
    if (tarefa?.dataTerminada) {
      this.dataTerminada = new Date(tarefa.dataTerminada);
    }
    
    // console.log("Dados da Tarefa: "+JSON.stringify(tarefa));
    this.exibirAnexarFicheiro = true;
    this.validar = false;
  }


  modalBaixarCorrecao(tarefa?: Tarefa): void {
    // this.tarefaServico.procurarTarefaPorCodigo(tarefa.codigoDoCandidato).subscribe( resultado => { this.tarefa = resultado; }); 
    this.tarefa = tarefa;
    if (tarefa?.dataEntrega) {
      this.dataEntrega = new Date(tarefa.dataEntrega);
    }
    if (tarefa?.dataTerminada) {
      this.dataTerminada = new Date(tarefa.dataTerminada);
    }
    
    // console.log("Dados da Tarefa: "+JSON.stringify(tarefa));
    this.exibirBaixarCorrecao = true;
    this.validar = false;
  }

  cancelar(): void {
    this.exibirAddTarefa = false;
    this.exibirAnexarFicheiro = false;
    this.exibirBaixarCorrecao = false;
    this.anexouFicheiro = false;
    this.validar = false;
    this.dataEntrega = null;
    this.dataTerminada = null;
    this.tarefa = new Tarefa();
  }

  displayFileName(): void {
    const input: HTMLInputElement | null = document.getElementById('file') as HTMLInputElement;
    const fileNameSpan: HTMLSpanElement | null = document.getElementById('file-name') as HTMLSpanElement;
    if (input && fileNameSpan && input.files && input.files.length > 0) {
        fileNameSpan.textContent = input.files[0].name;
    } else {
        if (fileNameSpan) fileNameSpan.textContent = '';
    }
}


  async onUploadFile($event: FileUpload) {
    const file = $event.files[0];
    this.gridfsService.uploadFile(file).subscribe(
      response => {
        console.log('Ficheiro enviado com sucesso:', response);
      },
      error => {
        this.tarefa.idFicheiroResposta = error.error.text;
        console.error('Erro ao enviar o ficheiro:', error);
      }
    );
  }

  uploadFile(event: any, tipoOperacao: string) {
    const file = event.target.files[0];
    // const input: HTMLInputElement | null = document.getElementById('file') as HTMLInputElement;
    const fileNameSpan: HTMLSpanElement | null = document.getElementById('file-name') as HTMLSpanElement;
    fileNameSpan.textContent = file.name;
    this.gridfsService.uploadFile(file).subscribe(
      response => {
        console.log('Ficheiro enviado com sucesso:', response);
      },
      error => {
        if (tipoOperacao==="respostaEstudante") {
          this.tarefa.idFicheiroResposta = error.error.text;
          this.anexouFicheiro = true;
          console.error('Id do Ficheiro:', this.tarefa.idFicheiroResposta);
          console.error('Erro ao enviar o ficheiro:', error);
        }
        if (tipoOperacao==="correcaoProfessor") {
          this.tarefa.idFicheiroCorrecao = error.error.text;
          console.error('Id do Ficheiro:', this.tarefa.idFicheiroCorrecao);
          this.anexouFicheiro = true;
          console.error('Erro ao enviar o ficheiro:', error);
        }
      }
    );
  }

  // visualizarAnexo(fileId: string) {
  //   this.gridfsService.downloadFile(fileId).subscribe(
  //     response => {
  //       const blob = new Blob([response.body], { type: 'application/octet-stream' }); // Defina o tipo MIME correto
  //       const url = window.URL.createObjectURL(blob);
  //       window.open(url);
  //     },
  //     error => {
  //       console.error('Erro ao baixar o ficheiro:', error);
  //     }
  //   );
  // }

  visualizarAnexo(fileId: string) {
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
          window.open(url);
        } else {
          console.error('Erro ao baixar o ficheiro: ', response.error);
        }
      },
      error => {
        console.error('Erro ao baixar o ficheiro: ', error);
      }
    );
  }

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

  salvar(): void {
    this.validar = true;
    this.tarefa.idTFC = this.idTFC;
    this.tarefa.dataEntrega = this.dataEntrega;
    // this.tarefa.dataTerminada = this.dataTerminada;
    // this.tarefa.estadoTarefa = this.estadoTarefaSelecionado;
    console.log("Tarefa Dada: "+JSON.stringify(this.tarefa));

    if (this.tarefa.id>=1) {
      if (this.tarefa && this.tarefa?.idFicheiroResposta?.length>=6) {
        if (this.tarefa.dataEntrega) {
          this.dataEntrega = new Date(this.tarefa.dataEntrega);
        }
        this.tarefa.dataTerminada = new Date();
        this.tarefa.estadoTarefa = EstadoTarefa.Concluido;
      this.tarefaServico.actualizarTarefa(this.tarefa.id, this.tarefa).subscribe(resultado => {
        this.notificacaoMsg("success", "Tarefa", "A Tarefa foi Concluida com Sucesso!");
        this.cancelar();
      }); 
      } else {
        this.notificacaoMsg("warn", "Tarefa", "Não foi anexado nenhum ficheiro a Tarefa!");
      }
      this.anexouFicheiro = false;

    } 
    else if (this?.tarefa?.titulo && this?.tarefa?.descricao && this?.dataEntrega){
      this.tarefaServico.salvarTarefa(this.tarefa).subscribe(resultado => {
        this.tarefas.unshift(this.tarefa);
        this.notificacaoMsg("success", "Tarefa", "A Tarefa foi Criada com Sucesso!");
        this.cancelar();
      }); 

    } else {
      console.log("Deve preencher os dados!");

    }

  }

  limpar(tabela: Table) {
    tabela.clear();
  }

  modalDetalhes(tarefa: Tarefa): void {
    this.tarefa = tarefa;
    this.exibirDetalhes = true;
  }

  concluirTarefa(tarefa: Tarefa) {
    this.tarefa = tarefa;
    console.log("Info da Tarefa: "+JSON.stringify(this.tarefa));
    // if (tarefa && tarefa?.idFicheiroResposta.length>=6) {
    if (tarefa && this?.anexouFicheiro) {
      if (tarefa.dataEntrega) {
        this.dataEntrega = new Date(tarefa.dataEntrega);
      }
      this.dataTerminada = new Date();
      this.tarefa.estadoTarefa = 3;

      this.tarefa.idFicheiroResposta = tarefa.idFicheiroResposta;

      this.salvar();
      console.log("O estado foi alterado: "+JSON.stringify(this.tarefa));
    } 
    else {
      this.notificacaoMsg("warn", "Tarefa", "Deves anexar o ficheiro, para Concluir a Tarefa!");
      
    }
  }

  correcaoTarefa(tarefa: Tarefa) {
    this.tarefa = tarefa;
    console.log("Info da Tarefa: "+JSON.stringify(this.tarefa));
    // if (tarefa && tarefa?.idFicheiroCorrecao.length>=6) {
    if (tarefa && this.anexouFicheiro) {
      if (tarefa.dataEntrega) {
        this.dataEntrega = new Date(tarefa.dataEntrega);
      }
      // this.dataTerminada = new Date();
      // this.tarefa.estadoTarefa = 3;

      this.tarefa.idFicheiroCorrecao = tarefa.idFicheiroCorrecao;

      this.salvar();
      console.log("O estado foi alterado: "+JSON.stringify(this.tarefa));
    } 
    else {
      this.notificacaoMsg("warn", "Tarefa", "Deves anexar o ficheiro, para Correção da Tarefa!");
      
    }
  }

  eliminarTarefa(idTarefa: number) {
    this.confirmationService.confirm({
      message: "Eliminar a Tarefa?",
      accept: () => {
        console.log("Tarefa Eliminada com Sucesso!");
        this.tarefas = this.tarefas.filter(t => t.id != idTarefa)
        // const t = this.tarefas.findIndex(t => t.id === idTarefa);
        // this.tarefas = this.tarefas.splice(t,1);
        this.tarefaServico.eliminarTarefa(idTarefa).subscribe();
      }
    });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  getInfoUser() {
    this.userInfo = this.authenticationService.getDecodedToken();
  }

  notificacaoMsg(tipoNotificacao?: string, cabecario?: string, msg?: string) {
    this.messageService.add({severity: tipoNotificacao, summary:cabecario, detail: msg});
  }

  // findArea(id: number): string  {
  //   const area = this.areas ? this.areas.find(o => o.id === id) : null;
  //   return area ? area.descricao : 'Não Definida';
  // }

  findTarefa(estadoTarefa: EstadoTarefa): string  {
    switch (estadoTarefa) {
      case 0:
        return "Pendente"
        break;
      case 1:
        return "A Fazer";
        break;
      
      case 2:
        return "Atrasado";
        break;
      case 3:
        return "Concluida";
        break;
    
      default:
        return "Pendente";
        break;
    }
  }

//----- 
}
