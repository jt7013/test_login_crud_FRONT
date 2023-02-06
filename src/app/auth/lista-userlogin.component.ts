import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from '../models/login-usuario';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';


import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrls: ['./lista-user.component.css']
})
export class ListaUserComponent implements OnInit {

  usuarios: LoginUsuario[] = [];
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
      if (rol === 'ROLE_ADMIN') {
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
