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
import { Estudante } from 'src/app/modelo/entidades/estudante';
import { Funcionario } from 'src/app/modelo/entidades/funcionario';
import { Professor } from 'src/app/modelo/entidades/professor';
import { TFC } from 'src/app/modelo/entidades/tfc';
import { EstadoTFC } from 'src/app/modelo/enumerados/estadoTFC';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { BancaService } from 'src/app/servicos/banca.service';
import { BancaProfessorService } from 'src/app/servicos/bancaprofessor.service';
import { EstudanteService } from 'src/app/servicos/estudante.service';
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
  tfcs: Array<TFC>;
  professores: Array<Professor> = new Array<Professor>();
  professoresSelecionados: Array<Professor> = new Array<Professor>();
  presidente: Professor = new Professor();
  primeiroVogal: Professor = new Professor();
  segundoVogal: Professor = new Professor();
  estudantes: Array<Estudante>;
  estudanteSelecionado: Estudante;
  bancasProfessores: Array<BancaProfessor>;
  bancas: Array<Banca> = new Array<Banca>();
  banca: Banca = new Banca();
  dataHoraApresentacao: Date;

  estadoTFCSelecionado: EstadoTFC;

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
    private confirmationService: ConfirmationService, 
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

    this.estudanteService.listarEstudantes().subscribe( resultados => { 
      this.estudantes = resultados; 
      // console.log("TFCs: "+JSON.stringify(this.estudantes));
    });

    if(this.isRole("Estudante")) {
      const id = Number(this.userInfo.id);
      // this.tfcServico.TFCEstudante(id).subscribe( resultados => { 
      //   this.tfcs = resultados; 
      //   console.log("TFCs: "+JSON.stringify(this.tfcs));
      // });
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
        // console.log("TFCs: "+JSON.stringify(this.tfcs));
      });
    }

    // this.tfcServico.listarTFCs().subscribe( resultados => { 
    //   this.tfcs = resultados; 
    //   console.log("TFCs: "+JSON.stringify(this.tfcs));
    // });

    this.bancaServico.listarBancas().subscribe( resultado => {
      this.bancas = resultado;
      // console.log("Bancas Encontradas: "+JSON.stringify(this.bancas));

    });

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

      if(this.isRole("Coordenador")) {
        this.tfc.idCoordenador = Number(this.userInfo.id);
      }
      // console.log("Id Coordenador: "+this.banca?.id);
      this.bancaServico.actualizarBanca(this.banca.id, this.banca).subscribe(resultado => {
        this.cancelar();
      }); 
    } else {
      this.banca.dataApresentacao = this.dataHoraApresentacao;
      this.tfcServico.TFCEstudante(this.estudanteSelecionado.id).subscribe( tfc => {
        this.banca.tfc = tfc.shift();
        this.banca.idTFC = this.banca.tfc.id;
        // console.log("TFC: "+JSON.stringify(this.banca.tfc));

        const bancaprofessor1: BancaProfessor = new BancaProfessor();
        const bancaprofessor2: BancaProfessor = new BancaProfessor();
        const bancaprofessor3: BancaProfessor = new BancaProfessor();
  
        bancaprofessor1.categoria = "Presidente";
        // bancaprofessor1.professor = this.presidente;
        bancaprofessor1.idProfessor = this.presidente.id;
        bancaprofessor1.idBanca = this.banca?.id;
        // bancaprofessor1.Banca = this.banca;
        
        bancaprofessor2.categoria = "1º Vogal";
        // bancaprofessor2.professor = this.primeiroVogal;
        bancaprofessor2.idProfessor = this.primeiroVogal.id;
        bancaprofessor2.idBanca = this.banca?.id;
        // bancaprofessor2.Banca = this.banca;
  
        bancaprofessor3.categoria = "2º Vogal";
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

      }); 

    }

    // if (this.tfc) {
    //   this.tfcServico.salvarTFC(this.tfc).subscribe(resultado => {
    //     this.tfcs.unshift(this.tfc);
    //     this.cancelar();
    //   }); 
    // }

  }

  alterarEstado(tfc: TFC) {
    this.tfc = tfc;
    console.log("Os Dados da TFC: "+JSON.stringify(this.tfc));
    this.confirmationService.confirm({
      message: "Deseja Aceitar o Tema?",
      accept: () => {
        console.log("Tema Aceita com Sucesso!");
        console.log("Os Dados da TFC: "+JSON.stringify(this.tfc));
        if (tfc) {
          if (this.isRole("Estudante")) {
            this.tfc.respostaEstudante = true;
            this.tfc.idEstudante = Number(this.authenticationService.getDecodedToken().id);
            this.estudanteService.procurarEstudantePorId(this.tfc.idEstudante).subscribe((estudante)=> {
              this.tfc.estudante = estudante;
            })
          } else if (this.isRole("Professor")) {
            this.tfc.respostaProfessor = true;
            this.tfc.idProfessor = Number(this.authenticationService.getDecodedToken().id);
            this.propfessorServico.procurarProfessorPorId(this.tfc.idProfessor).subscribe((professor)=> {
              this.tfc.professor = professor;
            })
            this.tfc.coordenador = tfc.coordenador;
          }
          // if (tfc.respostaEstudante==true && tfc.respostaProfessor==true) {
          //   tfc.estado = EstadoTFC.Aprovado;
          // }
          console.log("O estado foi alterado: "+JSON.stringify(this.tfc));
          this.salvar();
          this.notificacaoMsg("success", "Alteração de Estado", "O estado Tema foi aceite com Sucesso!");
        }
      },
      reject: () => {
        this.notificacaoMsg("error", "Alteração de Estado", "O estado do Tema não foi alterado!");
        // if (tfc) {
        //   if (this.isRole("Estudante")) {
        //     this.tfc.respostaEstudante = true;
        //     this.tfc.idEstudante = Number(this.authenticationService.getDecodedToken().id);
        //   } else if (this.isRole("Professor")) {
        //     this.tfc.respostaProfessor = true;
        //     this.tfc.idProfessor = Number(this.authenticationService.getDecodedToken().id);
        //   }
        //   if (tfc.respostaEstudante==true && tfc.respostaProfessor==true) {
        //     tfc.estado = EstadoTFC.Aprovado;
        //   }
        //   console.log("O estado foi alterado: "+JSON.stringify(this.tfc));
        //   this.salvar();
        //   this.notificacaoMsg("success", "Alteração de Estado", "O estado Tema foi aceite com Sucesso!");
        // }
        console.log("Os Dados da TFC Após Ser Rejeitada: "+JSON.stringify(this.tfc));
      }
    });
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

  findEstadoTFC(estadoTFC: EstadoTFC): string  {
    switch (estadoTFC) {
      case 0:
        return "Proposta"
        break;
      case 1:
        return "Reprovado";
        break;
      
      case 2:
        return "Aprovado";
        break;
      case 3:
        return "Em Desenvolvimento";
        break;
      case 4:
        return "Finalizado";
        break;
      case 5:
        return "Defendido";
        break;
    
      default:
        return "Proposta";
        break;
    }
  }

  notificacaoMsg(tipoNotificacao?: string, cabecario?: string, msg?: string) {
    this.messageService.add({severity: tipoNotificacao, summary:cabecario, detail: msg});
  }

  verTarefas(id: number) {
    console.log("Enviou id "+id);
    this.router.navigateByUrl("/listarActividades", {state: {id}});
    // this.router.navigate(["/listarActividades",  {id: id}]);
  }

  verEncontros(id: number) {
    console.log("Enviou id "+id);
    this.router.navigateByUrl("/encontros", {state: {id}});
    // this.router.navigate(["/encontros",  {id: id}]);
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


}
