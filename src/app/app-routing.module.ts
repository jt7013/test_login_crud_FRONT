import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { EditarUserComponent } from './auth/editar-user.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { ListaUserComponent } from './auth/lista-user.component';

import { RegistroComponent } from './auth/registro.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';

import { AuthService as ase} from './service/auth.service';

// 
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'lista', component: ListaProductoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'prod', 'user'] } },
  { path: 'listauser', component: ListaUserComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'editaruser/:id', component: EditarUserComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
 
  { path: 'detalle/:id', component: DetalleProductoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'prod'] } },
  { path: 'nuevo', component: NuevoProductoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'prod'] } },
  { path: 'editar/:id', component: EditarProductoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'prod'] } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{
  
  
 }
