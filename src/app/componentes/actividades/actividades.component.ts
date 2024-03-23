import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Proposta } from 'src/app/modelo/entidades/proposta';
import { Tarefa } from 'src/app/modelo/entidades/tarefa';
import { EstadoTarefa } from 'src/app/modelo/enumerados/estadoTarefa';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AreaService } from 'src/app/servicos/area.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { CandidatoServico } from 'src/app/servicos/candidatoservico.service';
import { OrgaoServico } from 'src/app/servicos/orgaoservico.service';
import { ProfessorService } from 'src/app/servicos/professor.service';
import { PropostaService } from 'src/app/servicos/proposta.service';
import { TarefaService } from 'src/app/servicos/tarefa.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  //dadosDeUso: DadosDeUso;
  exibirDetalhes = false;
  tarefa = new Tarefa();
  tarefas: Array<Tarefa>;
  proposta = new Proposta();
  propostas: Array<Proposta>;
  estadoTarefa: boolean;
  dataEntrega: Date;
  dataTerminada: Date;
  checkboxEstado: boolean;

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
    private config: PrimeNGConfig,
    public mediaObserver: MediaObserver,
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService,
    // private propfessorServico: ProfessorService,
    // private areaService: AreaService,
    private tarefaServico: TarefaService,
    private propostaServico: PropostaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();

    // this.areaService.listarAreas().subscribe( resultados => { 
    //   this.areas = resultados; 
    // });  

    // this.propfessorServico.listarProfessores().subscribe( resultados => { 
    //   this.professores = resultados; 
    // }); 

    this.propostaServico.listarPropostas().subscribe( resultados => {
      this.proposta = resultados.shift();
    });

    this.tarefaServico.listarTarefas().subscribe( resultados => { 
      this.tarefas = resultados; 
    });

    
    /*this.dadosDeUso = new DadosDeUso();
    this.dadosDeUso.os = deviceInfo.os;
    this.dadosDeUso.browser = deviceInfo.browser;
    this.dadosDeUso.type = this.deviceService.isMobile ? ''Telefone :
    (this.deviceService.isTablet ? 'Tablet' : 'Desktop');
    this.dadosDeUso.userAgent = deviceInfo.userAgent;
    this.servico.salvarDadosDeUso(this.dadosDeUso);*/

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
    return this.tarefa.id ? 'Editar Actividade' : 'Adicionar Actividade';
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
    this.exibir = true;
    this.validar = false;
  }

  cancelar(): void {
    this.exibir = false;
    this.validar = false;
    this.dataEntrega = null;
    this.dataTerminada = null;
    this.tarefa = new Tarefa();
  }

  salvar(): void {
    this.validar = true;
    this.tarefa.idProposta = this.proposta.id;
    this.tarefa.dataEntrega = this.dataEntrega;
    this.tarefa.dataTerminada = this.dataTerminada;
    // this.tarefa.estadoTarefa = this.estadoTarefaSelecionado;
    console.log("Tarefa Dada: "+JSON.stringify(this.tarefa));

    if (this.tarefa.id>=1) {
      this.tarefaServico.actualizarTarefa(this.tarefa.id, this.tarefa).subscribe(resultado => {
        this.cancelar();
      }); 
    } else {
      this.tarefaServico.salvarTarefa(this.tarefa).subscribe(resultado => {
        this.tarefas.unshift(this.tarefa);
        this.cancelar();
      }); 

    }

  }

  limpar(tabela: Table) {
    tabela.clear();
  }

  modalDetalhes(tarefa: Tarefa): void {
    this.tarefa = tarefa;
    this.exibirDetalhes = true;
  }

  alterarEstado(tarefa: Tarefa) {
    this.tarefa = tarefa;
    if (tarefa) {
      if (tarefa.dataEntrega) {
        this.dataEntrega = new Date(tarefa.dataEntrega);
      }
      this.dataTerminada = new Date();
      // this.checkboxEstado = false;
      this.tarefa.estadoTarefa = 3;
      this.salvar()
      console.log("O estado foi alterado: "+JSON.stringify(this.tarefa));
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
