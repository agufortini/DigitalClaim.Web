export class Usuario {
    usu_IDUsuario: number;
    usu_username: string;
    usu_password: string;
    usu_dni: number;
    usu_nombre: string;
    usu_apellido: string;
    usu_telefono: number;
    usu_email: string;
    usu_IDRol: number;
    usu_IDAreaServicio: number;
    usu_arServNombre: string;
    boExiste: boolean;
    constructor() { }
}

export interface IUsuario {
    usu_IDUsuario: number;
    usu_dni: number;
    usu_nombreCompleto: string;
    usu_IDRol: number;
}
