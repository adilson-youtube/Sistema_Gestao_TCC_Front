import { Component, Input } from '@angular/core';
import { Banca } from 'src/app/modelo/entidades/banca';
import { BancaProfessor } from 'src/app/modelo/entidades/bancaprofessor';
import { Professor } from 'src/app/modelo/entidades/professor';
import { ProfessorService } from 'src/app/servicos/professor.service';

@Component({
  selector: 'app-detalhes-banca',
  templateUrl: './detalhes-banca.component.html',
  styleUrls: ['./detalhes-banca.component.css']
})
export class DetalhesBancaComponent {

  private _banca: Banca;
  

  constructor(private professorServico: ProfessorService) { 
  }

  ngOnInit(): void {
    console.log("A banca professor enviada é: "+JSON.stringify(this.banca.bancasProfessores));
  }

  get banca(): Banca {
    return this._banca;
  }

  findBancaProfessor(bancasProfessores: Array<BancaProfessor>, categoria: string): Professor {
    var bancaProfessorAux: BancaProfessor = new BancaProfessor();
    var professor = new Professor();
    bancaProfessorAux = bancasProfessores.find((bp) => {
      bp.categoria == categoria;
    });
    this.professorServico.procurarProfessorPorId(bancaProfessorAux.idProfessor).subscribe( resultado => {
      professor = resultado;
      console.log("Professor Encontrado: "+professor);
      return professor;
    });
    return professor;
  }

  @Input()
  set banca(banca: Banca) {
    this._banca = banca; 
  }

//----- 

}
