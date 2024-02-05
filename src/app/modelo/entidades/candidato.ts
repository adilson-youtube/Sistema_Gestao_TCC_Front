import { DadosPessoais } from "./dadosPessoais";
import { ContactosOficiais } from './contactosOficiais';

export class Candidato {
    codigo: string;
    //fase: Fase = Fase.Inicial;
    //estado: Estado = Estado.Pendente;
    dadosPessoais: DadosPessoais = new DadosPessoais();
    contactos: ContactosOficiais = new ContactosOficiais();
    //documentacoes: Array<Documentacao> = [new Documentacao()]; 
    //qualificacoesTecnicas: Array<QualificacaoTecnica> = [new QualificacaoTecnica()];
    //ultimaQualificacaoAcademica: QualificacaoAcademica = new QualificacaoAcademica();
    //qualificacoesAcademicas: Array<QualificacaoAcademica> = [new QualificacaoAcademica()];   
}