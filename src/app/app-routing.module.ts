import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './servicos/admin.guard';
import { AreasComponent } from './componentes/areas/areas.component';
import { ContactosComponent } from './componentes/contactos/contactos.component';
import { LoginComponent } from './componentes/authentication/login/login.component';
import { AuthUserComponent } from './componentes/authentication/auth-user/auth-user.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MarcacaoComponent } from './componentes/marcacao/marcacao.component';
import { RegistarProrietarioComponent } from './componentes/proprietario/registar-prorietario/registar-prorietario.component';
import { DadosUsuarioComponent } from './componentes/proprietario/registar-prorietario/dados-usuario/dados-usuario.component';
import { DadosPessoaisComponent } from './componentes/proprietario/registar-prorietario/dados-pessoais/dados-pessoais.component';
import { DadosAnimalComponent } from './componentes/proprietario/registar-prorietario/dados-animal/dados-animal.component';
import { ConfirmacaoComponent } from './componentes/proprietario/registar-prorietario/confirmacao/confirmacao.component';
import { RegistarVeterinarioComponent } from './componentes/veterinario/registar-veterinario/registar-veterinario.component';
import { DadosUsuarioVeterinarioComponent } from './componentes/veterinario/registar-veterinario/dados-usuario-veterinario/dados-usuario-veterinario.component';
import { DadosPessoaisVeterinarioComponent } from './componentes/veterinario/registar-veterinario/dados-pessoais-veterinario/dados-pessoais-veterinario.component';
import { ConfirmacaoVeterinarioComponent } from './componentes/veterinario/registar-veterinario/confirmacao-veterinario/confirmacao-veterinario.component';
import { ServicosComponent } from './componentes/servicos/servicos.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'registarServico', component: ServicosComponent },
  { path: 'marcacao', component: MarcacaoComponent },
  { path: 'registarProrietario', component: RegistarProrietarioComponent, children: 
    [
      {path: '', redirectTo: 'acesso', pathMatch: 'full'},
      {path: 'acesso', component: DadosUsuarioComponent},
      {path: 'pessoais', component: DadosPessoaisComponent},
      {path: 'animal', component: DadosAnimalComponent},
      {path: 'confirmacao', component: ConfirmacaoComponent}
    ]
  },
  { path: 'registarVeterinario', component: RegistarVeterinarioComponent, children: 
    [
      {path: '', redirectTo: 'acesso-veterinario', pathMatch: 'full'},
      {path: 'acesso-veterinario', component: DadosUsuarioVeterinarioComponent},
      {path: 'pessoais-veterinario', component: DadosPessoaisVeterinarioComponent},
      {path: 'confirmacao-veterinario', component: ConfirmacaoVeterinarioComponent}
    ]
  },
  { path: 'contactos', component: ContactosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dsics-admin', component: AuthUserComponent, canActivate: [AdminGuard], children: [
      { path: '', redirectTo: 'contactos', pathMatch: 'full'},
      { path: 'contactos', component: ContactosComponent },
      { path: 'areas', component: AreasComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
