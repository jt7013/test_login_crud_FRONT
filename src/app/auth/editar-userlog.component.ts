import { Component, OnInit } from '@angular/core';

import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Rol } from '../models/rol-usuario';
import { UsuarioRol } from '../models/usuario-rol';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.css']
})
export class EditarUserComponent implements OnInit {

  //usuario: NuevoUsuario = null;
  usuario: UsuarioRol;
  rolSelected: Rol = null;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    //this.authService.detail(id).subscribe(
    this.authService.detailUsuarioRol(id).subscribe(
      data => {
        this.usuario = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.authService.upd(id, this.usuario).subscribe(
      data => {
        this.toastr.success('Usuarioo Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listauserlogin']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        
      }
    );
  }

}
