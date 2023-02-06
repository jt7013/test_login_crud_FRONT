import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';
import { Usuario } from '../models/user';
import { UsuarioRol } from '../models/usuario-rol';
import { Rol } from '../models/rol-usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';
  

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }


  public detail(id: number): Observable<NuevoUsuario> {
    return this.httpClient.get<NuevoUsuario>(this.authURL + `detail/${id}`);
  }

  public detailUsuarioRol(id: number): Observable<UsuarioRol> {
    return this.httpClient.get<UsuarioRol>(this.authURL + `detail/${id}`);
  }

  public upd(id: number, updUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.put<any>(this.authURL + `update/${id}`, updUsuario);
  }

  public update(id: number, updUsuario: Usuario): Observable<any> {
    return this.httpClient.put<any>(this.authURL + `update/${id}`, updUsuario);
  }

  public listaRoles(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(this.authURL + 'listroles');
  }

  public lista(): Observable<NuevoUsuario[]> {
    return this.httpClient.get<NuevoUsuario[]>(this.authURL + 'lista');
  }

  public listaUsuarios(): Observable<UsuarioRol[]> {
    return this.httpClient.get<UsuarioRol[]>(this.authURL + 'lista');
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.authURL + `delete/${id}`);
  }

  public retExpRol(mod: string): string[] {
    
    return  ['admin', 'user']  ;
  }


}
