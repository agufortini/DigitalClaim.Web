export class SesionUsuario {
    su_IDSesion: number;
    su_fechaInicio: string;
    su_fechaFin: string;
    su_horaInicio: string;
    su_horaFin: string;
    su_IDUsuario: number;
    constructor() {}
}

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
    usu_IDSesion: number;
    usu_fechaInicio: string;
    usu_horaInicio: string;
    boExiste: boolean;
    constructor() { }
}

export class RecuperarPassword {
    usu_email: string;
    usu_nombre: string;
    usu_nombreCompleto: string;
    usu_password: string;
    constructor() { }
}

export interface IUsuario {
    usu_IDUsuario: number;
    usu_dni: number;
    usu_nombreCompleto: string;
    usu_IDRol: number;
}
