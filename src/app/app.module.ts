
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule} from '@angular/material/badge';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatMenuModule} from '@angular/material/menu';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
//import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { MultiSelectModule } from 'primeng/multiselect';

import { ToastModule } from 'primeng/toast';
//import { RatingModule} from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ContextMenuModule} from 'primeng/contextmenu';
//import { ProgressBarModule} from 'primeng/progressbar';
import { InputNumberModule} from 'primeng/inputnumber';
//import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {GalleriaModule} from 'primeng/galleria';
import {StepsModule} from 'primeng/steps';
import {SplitterModule} from 'primeng/splitter';
import {DividerModule} from 'primeng/divider';
import {TimelineModule} from 'primeng/timeline';
import {MultiSelectModule} from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';
import {TooltipModule} from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {BadgeModule} from 'primeng/badge';
import {PickListModule} from 'primeng/picklist';
import {OrderListModule} from 'primeng/orderlist';
// import { NgxDocViewerModule } from 'ngx-doc-viewer';

// import { PdfViewerModule } from 'ng2-pdf-viewer';


import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api'
import { CardModule } from 'primeng/card';
//import { StepsModule } from 'primeng/steps';
//import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule} from 'primeng/inputmask';
//import { SplitButtonModule } from 'primeng/splitbutton';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from 'primeng/editor';

//---- componentes - Sistema ------
import { AppComponent } from './app.component';
import { NavComponent } from './componentes/comum/nav/nav.component';
import { AreasComponent } from './componentes/areas/areas.component';
import { AuthenticationService } from './servicos/authentication.service';
import { HeaderComponent } from './componentes/comum/header/header.component';
import { FooterComponent } from './componentes/comum/footer/footer.component';
import { LoginComponent } from './componentes/authentication/login/login.component';
import { RecoveryComponent } from './componentes/authentication/recovery/recovery.component';
import { RegisterComponent } from './componentes/authentication/register/register.component';
import { AuthUserComponent } from './componentes/authentication/auth-user/auth-user.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CarrosselComponent } from './componentes/carrossel/carrossel.component';
import { CartoesComponent } from './componentes/cartoes/cartoes.component';
import { ServicosComponent } from './componentes/servicos/servicos.component';
import { VacinaComponent } from './componentes/servicos/vacina/vacina.component';
import { ExameComponent } from './componentes/servicos/exame/exame.component';
import { ConsultaComponent } from './componentes/servicos/consulta/consulta.component';
import { CirurgiaComponent } from './componentes/servicos/cirurgia/cirurgia.component';
import { MarcacaoComponent } from './componentes/marcacao/marcacao.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { CadastrarComponent } from './componentes/usuario/cadastrar/cadastrar.component';
import { ConfirmacaoComponent } from './componentes/proprietario/registar-prorietario/confirmacao/confirmacao.component'; 
import { RegistarProrietarioComponent } from './componentes/proprietario/registar-prorietario/registar-prorietario.component';
import { DadosPessoaisComponent } from './componentes/proprietario/registar-prorietario/dados-pessoais/dados-pessoais.component';
import { DadosUsuarioComponent } from './componentes/proprietario/registar-prorietario/dados-usuario/dados-usuario.component';
import { DadosAnimalComponent } from './componentes/proprietario/registar-prorietario/dados-animal/dados-animal.component';
import { VeterinarioComponent } from './componentes/veterinario/veterinario.component';
import { RegistarVeterinarioComponent } from './componentes/veterinario/registar-veterinario/registar-veterinario.component';
import { DadosUsuarioVeterinarioComponent } from './componentes/veterinario/registar-veterinario/dados-usuario-veterinario/dados-usuario-veterinario.component';
import { DadosPessoaisVeterinarioComponent } from './componentes/veterinario/registar-veterinario/dados-pessoais-veterinario/dados-pessoais-veterinario.component';
import { ConfirmacaoVeterinarioComponent } from './componentes/veterinario/registar-veterinario/confirmacao-veterinario/confirmacao-veterinario.component';
import { TFCsComponent } from './componentes/propostas/tfcs.component';
import { EnviarComponent } from './componentes/propostas/enviar/enviar.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { CadastrarUsuarioComponent } from './componentes/usuarios/cadastrar-usuario/cadastrar-usuario.component';
import { DetalhesComponent } from './componentes/propostas/detalhes/detalhes.component';
import { DetalhesTarefaComponent } from './componentes/actividades/detalhes/detalhes-tarefa.component';
import { ActividadesComponent } from './componentes/actividades/actividades.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { NotificacaoComponent } from './componentes/notificacao/notificacao.component';
import { AuthInterceptor } from './servicos/auth.interceptor';
import { EnviarNotificacaoComponent } from './componentes/notificacao/enviar-notificacao/enviar-notificacao.component';
import { ReservadoComponent } from './componentes/reservado/reservado.component';
import { FileUploadComponent } from './componentes/file-upload/file-upload.component';
import { EncotrosComponent } from './componentes/encotros/encotros.component';
import { TfcsDefendidosComponent } from './componentes/tfcs-defendidos/tfcs-defendidos.component';
import { DetalhesEncontroComponent } from './componentes/encotros/detalhes-encontro/detalhes-encontro.component';
import { BancasComponent } from './componentes/bancas/bancas.component';
import { DetalhesBancaComponent } from './componentes/bancas/detalhes-banca/detalhes-banca.component';
import { EnviarTfcComponent } from './componentes/enviar-tfc/enviar-tfc.component';


@NgModule({
  declarations: [
    AppComponent,
    AreasComponent,
    
    NavComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AuthUserComponent,
    RecoveryComponent,
    RegisterComponent,
    InicioComponent,
    CarrosselComponent,
    CartoesComponent,
    ServicosComponent,
    VacinaComponent,
    ExameComponent,
    ConsultaComponent,
    CirurgiaComponent,
    MarcacaoComponent,
    UsuarioComponent,
    CadastrarComponent,
    ConfirmacaoComponent,
    RegistarProrietarioComponent,
    DadosPessoaisComponent,
    DadosUsuarioComponent,
    DadosAnimalComponent,
    VeterinarioComponent,
    RegistarVeterinarioComponent,
    DadosUsuarioVeterinarioComponent,
    DadosPessoaisVeterinarioComponent,
    ConfirmacaoVeterinarioComponent,
    TFCsComponent,
    EnviarComponent,
    UsuariosComponent,
    CadastrarUsuarioComponent,
    DetalhesComponent,
    ActividadesComponent,
    ChatComponent,
    NotificacaoComponent,
    EnviarNotificacaoComponent,
    ReservadoComponent,
    FileUploadComponent,
    EncotrosComponent,
    DetalhesTarefaComponent,
    TfcsDefendidosComponent,
    DetalhesEncontroComponent,
    BancasComponent,
    DetalhesBancaComponent,
    EnviarTfcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    ButtonModule,
    // QuillModule.forRoot(),
    FormsModule,
    FlexLayoutModule,
    InputTextModule,
    MatCardModule,
    DropdownModule,
    //MultiSelectModule,
   FileUploadModule,
   // FieldsetModule,
    TableModule,
    DialogModule,
   // RadioButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    CalendarModule,
    SliderModule,
    ContextMenuModule,
   // ProgressBarModule,
   // RatingModule,
    InputNumberModule,
    InputTextareaModule,
    EditorModule,
    HttpClientModule,
  //  ChartModule,
    CardModule,
    MatGridListModule,
    PasswordModule,
    //SplitButtonModule,
    SidebarModule,
    //StepsModule,
    PanelModule,
    InputMaskModule,
    MatMenuModule,
    GalleriaModule,
    StepsModule,
    SplitterModule,
    DividerModule,
    TimelineModule,
    MultiSelectModule,
    CheckboxModule,
    TooltipModule,
    MessagesModule,
    MessageModule,
    BadgeModule,
    PickListModule,
    OrderListModule,
    // NgxDocViewerModule
    // PdfViewerModule
  ],
  providers: [
    ConfirmationService, AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
