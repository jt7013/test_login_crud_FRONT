import { Rol } from "./rol-usuario";

export class UsuarioRol {
    nombre: string;
    nombreUsuario: string;
    email: string;
    password: string;
    roles: Rol[];
    constructor(nombre: string, nombreUsuario: string, email: string, 
        password: string, roles: Rol[]) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}
