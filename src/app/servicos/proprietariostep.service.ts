import { Injectable } from '@angular/core';
import { Proprietario } from '../modelo/entidades/prorietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioStep {

  proprietario = new Proprietario();

  getProprietario() {
      return this.proprietario;
  }

  setProprietario(_proprietario: Proprietario) {
      this.proprietario = _proprietario;
  }
}
