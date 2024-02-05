import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicosrepositorioService } from '../repositorios/servicosrepositorio.service';
import { Servico } from '../modelo/entidades/servico';
import { Consulta } from '../modelo/entidades/consulta';
import { Cirurgia } from '../modelo/entidades/cirurgia';
import { Vacina } from '../modelo/entidades/vacina';

@Injectable({
    providedIn: 'root'
})
export class ServicosService {

    constructor(private repositorio: ServicosrepositorioService) { }


    listarServicos(): Observable<Array<Servico>> {
        return this.repositorio.listarServicos();
    }


    procurarServicoPorId(codigo: number): Observable<Servico> {
        return this.repositorio.procurarServicoPorId(codigo);
    }

    salvarServico(servico: Servico): Observable<Servico> {
        return this.repositorio.salvarServico(servico);
    }

    salvarServicoLista(servico: Array<Servico>): Observable<Array<Servico>> {
        return this.repositorio.salvarServicoLista(servico);
    }


    actualizarServico(id: number, servico: Servico): Observable<Servico> {
        return this.repositorio.actualizarServico(id, servico);
    }


    eliminarServico(id: number): Observable<Servico> {
        return this.repositorio.eliminarServico(id);
    }


    listarCirurgias(): Observable<Array<Servico>> {
        return this.repositorio.listarCirurgias();
    }


    procurarCirurgiaPorId(codigo: number): Observable<Servico> {
        return this.repositorio.procurarCirurgiaPorId(codigo);
    }

    salvarCirurgia(cirurgia: Servico): Observable<Servico> {
        return this.repositorio.salvarCirurgia(cirurgia);
    }


    actualizarCirurgia(id: number, cirurgia: Cirurgia): Observable<Cirurgia> {
        return this.repositorio.actualizarCirurgia(id, cirurgia);
    }


    eliminarCirurgia(id: number): Observable<Cirurgia> {
        return this.repositorio.eliminarCirurgia(id);
    }


    listarExames(): Observable<Array<Servico>> {
        return this.repositorio.listarExames();
    }


    procurarExamePorId(codigo: number): Observable<Servico> {
        return this.repositorio.procurarExamePorId(codigo);
    }

    salvarExame(exame: Servico): Observable<Servico> {
        return this.repositorio.salvarExame(exame);
    }


    actualizarExame(id: number, exame: Consulta): Observable<Consulta> {
        return this.repositorio.actualizarExame(id, exame);
    }


    eliminarExame(id: number): Observable<Consulta> {
        return this.repositorio.eliminarExame(id);
    }


    listarVacinas(): Observable<Array<Servico>> {
        return this.repositorio.listarVacinas();
    }


    procurarVacinaPorId(codigo: number): Observable<Servico> {
        return this.repositorio.procurarVacinaPorId(codigo);
    }

    salvarVacina(vacina: Servico): Observable<Servico> {
        return this.repositorio.salvarVacina(vacina);
    }


    actualizarVacina(id: number, vacina: Vacina): Observable<Vacina> {
        return this.repositorio.actualizarVacina(id, vacina);
    }


    eliminarVacina(id: number): Observable<Vacina> {
        return this.repositorio.eliminarVacina(id);
    }


    listarConsultas(): Observable<Array<Servico>> {
        return this.repositorio.listarConsultas();
    }


    procurarConsultaPorId(codigo: number): Observable<Servico> {
        return this.repositorio.procurarConsultaPorId(codigo);
    }

    salvarConsulta(consulta: Servico): Observable<Servico> {
        return this.repositorio.salvarConsulta(consulta);
    }


    actualizarConsulta(id: number, consulta: Consulta): Observable<Consulta> {
        return this.repositorio.actualizarConsulta(id, consulta);
    }


    eliminarConsulta(id: number): Observable<Consulta> {
        return this.repositorio.eliminarConsulta(id);
    }

    // procurarProprietarioPorCodigo(codigo: string): Observable<Servico> {
    //     return this.repositorio.procurar(codigo);
    // }



}
