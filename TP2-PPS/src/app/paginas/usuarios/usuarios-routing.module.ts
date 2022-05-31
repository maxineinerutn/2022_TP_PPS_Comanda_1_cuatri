import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaClienteComponent } from './altas/alta-cliente/alta-cliente.component';
import { AltaDuenioSupervisorComponent } from './altas/alta-duenio-supervisor/alta-duenio-supervisor.component';

const routes: Routes = [
  {path:'altaDuenio', component:AltaDuenioSupervisorComponent},
  {path:'altaCliente', component:AltaClienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
