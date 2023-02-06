import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/rol-usuario';
import { AuthService } from './auth.service';



@Injectable()
export class DropdownService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {}

  getRoles() {
    //return this.http.get<RolUsuario[]>('assets/dados/estadosbr.json');
    return this.authService.listaRoles();
    
    
  }

  cargarUsuarios(): void {
    /*
    this.authService.lista().subscribe(
      data => {
        this.usuarios = data;
      },
      err => {
        console.log(err);
      }
    );
    */
  }

  
  getCidades(idEstado: number) {
    /*return this.http.get<RolUsuario[]>('assets/dados/cidades.json')
    .pipe(
      
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    );*/
  }

   

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
    ];
  }

}
