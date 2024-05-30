import { Component, Input } from '@angular/core';
import { Banca } from 'src/app/modelo/entidades/banca';
import { BancaProfessor } from 'src/app/modelo/entidades/bancaprofessor';
import { Professor } from 'src/app/modelo/entidades/professor';
import { PosicaoBanca } from 'src/app/modelo/enumerados/PosicaoBanca';
import { ProfessorService } from 'src/app/servicos/professor.service';

@Component({
  selector: 'app-detalhes-banca',
  templateUrl: './detalhes-banca.component.html',
  styleUrls: ['./detalhes-banca.component.css']
})
export class DetalhesBancaComponent {

  private _banca: Banca;
  presidente: Professor;
  primeiroVogal: Professor;
  segundoVogal: Professor;
  private _bancasProfessores: Array<BancaProfessor>;
  

  constructor(private professorServico: ProfessorService) { 
  }

  ngOnInit(): void {
    // console.log("A banca professor enviada é: "+JSON.stringify(this._banca));
  }

  get banca(): Banca {
    return this._banca;
  }

  @Input()
  set banca(banca: Banca) {
    this._banca = banca; 
    // console.log("A Banca enviada esta constituida Por: "+JSON.stringify(this._banca.bancasProfessores));
  }

  @Input()
  set bancasProfessores(bancasProfessores: Array<BancaProfessor>) {
    this._bancasProfessores = bancasProfessores; 
    this.findBancaPresidente(this._bancasProfessores);
    this.findBancaPrimeiroVogal(this._bancasProfessores);
    this.findBancaSegundoVogal(this._bancasProfessores);
    console.log("A Banca enviada esta constituida Por: "+JSON.stringify(this._banca.bancasProfessores));
    
  }

  findBancaPresidente(bancasProfessores: Array<BancaProfessor>) {
    var bancaProfessorAux: BancaProfessor = new BancaProfessor();
    if (bancasProfessores) {
      bancasProfessores.find((bp) => {
        if (bp.posicaoBanca == PosicaoBanca.Presidente) {
          bancaProfessorAux = bp;
        }
      });

      this.professorServico.procurarProfessorPorId(bancaProfessorAux.idProfessor).subscribe( resultado => {
        this.presidente = resultado;
      });
      
    }

  }

  findBancaPrimeiroVogal(bancasProfessores: Array<BancaProfessor>) {
    var bancaProfessorAux: BancaProfessor = new BancaProfessor();
    if (bancasProfessores) {
      bancasProfessores.find((bp) => {
        if (bp.posicaoBanca == PosicaoBanca.PrimeiroVogal) {
          bancaProfessorAux = bp;
        }
      });

      this.professorServico.procurarProfessorPorId(bancaProfessorAux.idProfessor).subscribe( resultado => {
        this.primeiroVogal = resultado;
      });
      
    }
  }

  findBancaSegundoVogal(bancasProfessores: Array<BancaProfessor>) {
    var bancaProfessorAux: BancaProfessor = new BancaProfessor();
    if (bancasProfessores) {
      bancasProfessores.find((bp) => {
        if (bp.posicaoBanca == PosicaoBanca.SegundoVogal) {
          bancaProfessorAux = bp;
        }
      });
      this.professorServico.procurarProfessorPorId(bancaProfessorAux.idProfessor).subscribe( resultado => {
        this.segundoVogal = resultado;
      });
      
    }

  }


//----- 

}
