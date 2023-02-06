import { Rol } from "./rol-usuario";

export class Usuario {
    nombreUsuario: string;
    email: string;
    nombre:string;
    roles: Rol[];

    constructor(nombreUsuario: string, nombre: string, email: string, roles: Rol[]) {
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.nombre=nombre;
        this.roles = roles;
    }


}
