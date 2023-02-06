import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoginUsuario } from '../models/login-usuario';
import { Usuario } from '../models/user';
import { Rol } from '../models/rol-usuario';
import { UsuarioRol } from '../models/usuario-rol';



@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.css']
})
export class EditarUserComponent implements OnInit {

  //usuario: NuevoUsuario = null;
  usuario: UsuarioRol = null;
//  roles: Rol = null;
  usuarioRoles: UsuarioRol;
  roles: Rol[];
  //seleccionado: Rol=new Rol(1, "ROLE_USER");
  tmpRol : Rol[];
  seleccionL1: Rol;
  actuales: string ="";
  listaSel : Rol [] =[];

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    
    const id = this.activatedRoute.snapshot.params.id;
    //this.seleccionado.push(new Rol(1,"ROLE_ADMIN"));
    
    //this.seleccionado=this.seleccionado;

    //this.authService.detail(id).subscribe(
    this.authService.detailUsuarioRol(id).subscribe(
      data => {
        this.usuario = data;

        this.usuario.roles.forEach(rol => {
          this.actuales += ' / ' + rol.rolNombre ;
         });
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );

    this.authService.listaRoles().subscribe(
      data => {
        this.roles = data;

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail Roles', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    )

    
  }

  agregar( ) {

    this.usuario.roles.push(this.seleccionL1);

    this.tmpRol = this.roles.filter((item) => item.id !== 1);

    this.roles=this.tmpRol;

   }

  compararNombres( rol1:Rol) {
    if (rol1==null ) {
      return false;
    }

    this.roles.forEach(rol => {
     return rol.rolNombre === rol1.rolNombre;
    });
    
  }

  comparar (): boolean {
 
    return false;
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;

    const tmpUser = new Usuario(this.usuario.nombreUsuario, this.usuario.nombre, this.usuario.email, this.usuario.roles);


    this.authService.update(id, tmpUser).subscribe(

    //this.authService.upd(id, this.usuario).subscribe(
      data => {
        this.toastr.success('Usuarioo Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listauser']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        
      }
    );
  }

}
