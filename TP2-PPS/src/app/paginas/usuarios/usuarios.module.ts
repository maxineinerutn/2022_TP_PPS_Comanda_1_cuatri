import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { AltaDuenioSupervisorComponent } from './altas/alta-duenio-supervisor/alta-duenio-supervisor.component';
import { AltaClienteComponent } from './altas/alta-cliente/alta-cliente.component';


@NgModule({
  declarations: [AltaDuenioSupervisorComponent, AltaClienteComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
