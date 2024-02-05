import { Injectable } from '@angular/core';
import { Veterinario } from '../modelo/entidades/veterinario';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioStep {

  veterinario = new Veterinario();

  getVeterinario() {
      return this.veterinario;
  }

  setVeterinario(_veterinario: Veterinario) {
      this.veterinario = _veterinario;
  }
}
