import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PrimeNGConfig, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/modelo/entidades/area';
import { Banca } from 'src/app/modelo/entidades/banca';
import { BancaProfessor } from 'src/app/modelo/entidades/bancaprofessor';
import { Correcao } from 'src/app/modelo/entidades/correcao';
import { Estudante } from 'src/app/modelo/entidades/estudante';
import { Funcionario } from 'src/app/modelo/entidades/funcionario';
import { Professor } from 'src/app/modelo/entidades/professor';
import { Tarefa } from 'src/app/modelo/entidades/tarefa';
import { TFC } from 'src/app/modelo/entidades/tfc';
import { PosicaoBanca } from 'src/app/modelo/enumerados/PosicaoBanca';
import { EstadoTFC } from 'src/app/modelo/enumerados/estadoTFC';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AnexoService } from 'src/app/servicos/anexo.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { BancaService } from 'src/app/servicos/banca.service';
import { BancaProfessorService } from 'src/app/servicos/bancaprofessor.service';
import { CorrecaoService } from 'src/app/servicos/correcao.service';
import { EstudanteService } from 'src/app/servicos/estudante.service';
import { GridfsService } from 'src/app/servicos/gridfs.service';
import { ProfessorService } from 'src/app/servicos/professor.service';
import { TFCService } from 'src/app/servicos/tfc.service';

@Component({
  selector: 'app-bancas',
  templateUrl: './bancas.component.html',
  styleUrls: ['./bancas.component.css']
})
export class BancasComponent {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  areas: Array<Area>;
  exibirDetalhes = false;
  tfc = new TFC();
  funcionario = new Funcionario;
  tfcs: Array<TFC> = new Array<TFC>();
  professores: Array<Professor> = new Array<Professor>();
  professoresSelecionados: Array<Professor> = new Array<Professor>();
  presidente: Professor;
  primeiroVogal: Professor;
  segundoVogal: Professor;
  estudantes: Array<Estudante>;
  estudanteSelecionado: Estudante;
  bancasProfessores: Array<BancaProfessor>;
  bancas: Array<Banca> = new Array<Banca>();
  banca: Banca = new Banca();
  dataHoraApresentacao: Date;
  correcao: Correcao = new Correcao();
  correcoes: Array<Correcao> = new Array<Correcao>();

  tfcSelecionado: TFC;
  estadoTFCSelecionado: EstadoTFC;

  exibirAddTarefa = false;
  exibirAnexarFicheiro = false;
  exibirBaixarCorrecao = false;
  anexouFicheiro = false;
  tarefa = new Tarefa();
  ficheiroTFC: any;

  dataEntrega: Date;
  dataTerminada: Date;
  
  estadoTFCs: any[] = [
    { name: 'Proposta', code: 0 },
    { name: 'Reprovado', code: 1 },
    { name: 'Aprovado', code: 2 },
    // { name: 'Em Desenvolvimento', code: 3 },
    // { name: 'Finalizado', code: 4 },
    // { name: 'Defendido', code: 5 }
  ];
  
  userInfo: any;


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
    private config: PrimeNGConfig,
    public mediaObserver: MediaObserver,
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService,
    private propfessorServico: ProfessorService,
    private estudanteService: EstudanteService,
    private tfcServico: TFCService,
    private bancaServico: BancaService,
    private bancaProfessorServico: BancaProfessorService,
    private professorServico: ProfessorService,
    private confirmationService: ConfirmationService, 
    private gridfsService: GridfsService,
    private correcaoService: CorrecaoService,
    private anexoService: AnexoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();

    // this.professoresSelecionados = new Array<Professor>();

    // this.propfessorServico.listarProfessores().subscribe( resultados => { 
    //   this.professores = resultados; 
    // }); 

    this.getInfoUser();

    this.estudanteService.ListarEstudantesTFCsFinalizados().subscribe( resultados => { 
      this.estudantes = resultados; 
      // console.log("TFCs: "+JSON.stringify(this.estudantes));
    });

    if(this.isRole("Estudante")) {
      const id = Number(this.userInfo.id);
      this.bancaServico.listarBancasPorIdEstudante(id).subscribe( resultados => { 
        this.bancas = resultados; 
        console.log("Bancas: "+JSON.stringify(this.tfcs));
      });
    }

    if(this.isRole("Professor")) {
      const id = Number(this.userInfo.id);
      this.bancaServico.listarBancasPorIdProfessor(id).subscribe( resultados => { 
        this.bancas = resultados; 
        console.log("Bancas: "+JSON.stringify(this.tfcs));
      });
    }

    this.propfessorServico.listarProfessores().subscribe( resultados => {
      this.professores = resultados; 
      this.professoresSelecionados = resultados; 
    });

    if(this.isRole("Coordenador")) {
      console.log("O role dele é de Coordenador!");
      const id = Number(this.userInfo.id);
      this.tfcServico.listarTFCs().subscribe( resultados => { 
        this.tfcs = resultados; 
      });

    this.bancaServico.listarBancas().subscribe( resultado => {
      this.bancas = resultado;
      // console.log("Bancas Encontradas: "+JSON.stringify(this.bancas.slice().shift().bancasProfessores));

    });

    }

    // this.tfcServico.listarTFCs().subscribe( resultados => { 
    //   this.tfcs = resultados; 
    //   console.log("TFCs: "+JSON.stringify(this.tfcs));
    // });

    // this.bancaServico.listarBancas().subscribe( resultado => {
    //   this.bancas = resultado;
    // });

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
    return this.banca?.id ? 'Editar Banca' : 'Adicionar Banca';
  }

  get visualizarCorrecaoHeader(): string {
    return "Correção da Banca";
  }


  modal(banca?: Banca): void {
    // this.tfcServico.procurarTFCPorCodigo(tfc.codigoDoCandidato).subscribe( resultado => { this.tfc = resultado; }); 
    this.banca = banca;
    this.exibir = true;
    this.validar = false;
  }

  cancelar(): void {
    this.banca = new Banca();
    this.estudanteSelecionado = new Estudante();
    this.presidente = new Professor();
    this.primeiroVogal = new Professor();
    this.segundoVogal = new Professor();
    this.exibir = false;
    this.validar = false;
  }

  salvar(): void {
    this.validar = true;

    if (this.banca?.id>=1) {
      console.log("A banca vai ser actualizada!");

      if(this.isRole("Coordenador")) {
        this.tfc.idCoordenador = Number(this.userInfo.id);
      }
      // console.log("Id Coordenador: "+this.banca?.id);
      this.bancaServico.actualizarBanca(this.banca.id, this.banca).subscribe(resultado => {
        this.cancelar();
      }); 
    } else if(this?.tfcSelecionado?.id && this?.presidente?.id && this?.primeiroVogal?.id && this?.segundoVogal.id && this?.dataHoraApresentacao) {
      console.log("Estudante Selecionado: "+JSON.stringify(this.estudanteSelecionado));
      this.banca.dataApresentacao = this.dataHoraApresentacao;
      
      this.banca.tfc = this.tfcSelecionado;
      this.banca.idTFC = this.banca.tfc.id;
      // console.log("TFC: "+JSON.stringify(this.banca.tfc));

      const bancaprofessor1: BancaProfessor = new BancaProfessor();
      const bancaprofessor2: BancaProfessor = new BancaProfessor();
      const bancaprofessor3: BancaProfessor = new BancaProfessor();

      bancaprofessor1.posicaoBanca = PosicaoBanca.Presidente;
      // bancaprofessor1.professor = this.presidente;
      bancaprofessor1.idProfessor = this.presidente.id;
      bancaprofessor1.idBanca = this.banca?.id;
      // bancaprofessor1.Banca = this.banca;
      
      bancaprofessor2.posicaoBanca = PosicaoBanca.PrimeiroVogal;
      // bancaprofessor2.professor = this.primeiroVogal;
      bancaprofessor2.idProfessor = this.primeiroVogal.id;
      bancaprofessor2.idBanca = this.banca?.id;
      // bancaprofessor2.Banca = this.banca;

      bancaprofessor3.posicaoBanca = PosicaoBanca.SegundoVogal;
      // bancaprofessor3.professor = this.segundoVogal;
      bancaprofessor3.idProfessor = this.segundoVogal.id;
      bancaprofessor3.idBanca = this.banca?.id;
      // bancaprofessor3.Banca = this.banca;

      this.banca.bancasProfessores = new Array<BancaProfessor>();
      this.banca.bancasProfessores.push(bancaprofessor1, bancaprofessor2, bancaprofessor3);

      this.bancaServico.salvarBanca(this.banca).subscribe(resultado => {
        this.banca = resultado;
        // console.log("A banca que foi Inserida: "+JSON.stringify(this.banca));
        this.bancas.unshift(this.banca);
        this.cancelar();
      });


      // this.tfcServico.TFCEstudante(this.estudanteSelecionado.id).subscribe( tfc => {

      // }); 

    } else {
      console.log("Deve preencher os dados da banca!");

    }

    // if (this.tfc) {
    //   this.tfcServico.salvarTFC(this.tfc).subscribe(resultado => {
    //     this.tfcs.unshift(this.tfc);
    //     this.cancelar();
    //   }); 
    // }

  }

  adicionarCorrecao(banca: Banca) {
    if (banca?.id) {
      this.correcao.idBanca = banca.id;
      this.correcaoService.salvarCorrecao(this.correcao).subscribe(resultado => {
        this.correcao = resultado;
        this.correcoes.push(this.correcao);
        this.limparCampos();
      });
    }
  }

  limparCampos(): void {
    this.correcao = new Correcao();
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  getInfoUser() {
    this.userInfo = this.authenticationService.getDecodedToken();
  }

  temTarefa(idTarefa: number): boolean {
    // this.tfc
    return idTarefa>=1 ? true : false;
  }

  limpar(tabela: Table) {
    tabela.clear();
  }

  modalDetalhes(banca: Banca): void {
    this.banca = banca;
    this.exibirDetalhes = true;
  }

  notificacaoMsg(tipoNotificacao?: string, cabecario?: string, msg?: string) {
    this.messageService.add({severity: tipoNotificacao, summary:cabecario, detail: msg});
  }

  reportTFCs() {
    this.tfcServico.reportTFCs().subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/pdf' }); // Defina o tipo MIME correto
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        const blob = new Blob([error.error.text], { type: 'application/pdf' }); // Defina o tipo MIME correto
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        console.error('O ficheiro:', JSON.stringify(error));
        console.error('Error downloading file:', error);
      }
    );
  }

  baixarTFC(idTFC: number) {
    
    this.anexoService.BuscarPorIdTFC(idTFC).subscribe(anexo => {

      this.gridfsService.downloadFile(anexo.idFicheiro).subscribe(
        (response: HttpResponse<Blob> | HttpErrorResponse) => {
          if (response instanceof HttpResponse) {
            const contentDispositionHeader = response.headers.get('Content-Disposition');
            const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = fileNameRegex.exec(contentDispositionHeader);
            const fileName = matches != null && matches[1] ? matches[1].replace(/['"]/g, '') : anexo.nomeFicheiro;
  
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
        });

    });

  }

  visualizarTFC(idTFC: number) {
    
    this.anexoService.BuscarPorIdTFC(idTFC).subscribe(anexo => {

      this.gridfsService.downloadFile(anexo.idFicheiro).subscribe(
        (response: HttpResponse<Blob> | HttpErrorResponse) => {
          if (response instanceof HttpResponse) {
            const contentDispositionHeader = response.headers.get('Content-Disposition');
            const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = fileNameRegex.exec(contentDispositionHeader);
            const fileName = matches != null && matches[1] ? matches[1].replace(/['"]/g, '') : anexo.nomeFicheiro;
  
            console.log("Conteudo do Cabeçario: "+JSON.stringify(response.headers.keys()))
  
            const blob = new Blob([response.body], { type: response.headers.get('Content-Type') });
  
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = fileName;
            // document.body.appendChild(a);
            // a.click();
            // window.URL.revokeObjectURL(url);
            // document.body.removeChild(a);
            this.ficheiroTFC = window.URL.createObjectURL(blob);
          } else {
            console.error('Error downloading file:', response.error);
          }
        },
        error => {
          console.error('Error downloading file:', error);
        });

    });

  }


  modalVisualizarCorrecao(banca?: Banca): void {
    this.banca = banca;
    this.correcoes = this.banca.correcoes;
    // this.visualizarTFC(banca?.tfc?.id);
    // console.log("O ficheiro de TFC: "+JSON.stringify(this.ficheiroTFC));
    this.correcaoService.ListarCorrecoesBanca(this.banca.id).subscribe(resultado => {
      this.correcoes = resultado;
      // console.log("As correções são: "+JSON.stringify(this.correcoes));
      // console.log("O Id da Banca é: "+JSON.stringify(this.banca.id));
    });
    this.exibirBaixarCorrecao = true;
    this.validar = false;
  }


  modalAnexarFicheiro(tarefa?: Tarefa): void { 
    this.tarefa = tarefa;
    if (tarefa?.dataEntrega) {
      this.dataEntrega = new Date(tarefa.dataEntrega);
    }
    if (tarefa?.dataTerminada) {
      this.dataTerminada = new Date(tarefa.dataTerminada);
    }
    this.exibirAnexarFicheiro = true;
    this.validar = false;
  }


}
