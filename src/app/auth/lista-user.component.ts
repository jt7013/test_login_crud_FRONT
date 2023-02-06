import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';


import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../models/user';
import { UsuarioRol } from '../models/usuario-rol';



@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrls: ['./lista-user.component.css']
})
export class ListaUserComponent implements OnInit {

  usuarios: NuevoUsuario[] = [];
  //usuarios: UsuarioRol[];
  roles: string[];
  isAdmin = false;
  

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol.indexOf('ROLE_ADMIN') === 0) {
        this.isAdmin = true;
      }
    });
  }

  cargarUsuarios(): void {
    this.authService.lista().subscribe(
      data => {
        this.usuarios = data;
      },
      err => {
        console.log(err);
      }
    );
    /*
    this.authService.listaUsuarios().subscribe(
        data => {
          this.usuarios = data;
        },
        err => {
          console.log(err);
        }
      );
      */
  }

  borrar(id: number) {
    this.authService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarUsuarios();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
