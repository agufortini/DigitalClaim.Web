export class SesionUsuario {
    su_IDSesion: number;
    su_fechaInicio: string;
    su_horaInicio: string;
    su_fechaFin: string;
    su_horaFin: string;
    su_username: string;
    su_password: string;
    su_dni: number;
    su_nombre: string;
    su_apellido: string;
    su_telefono: number;
    su_email: string;
    su_IDUsuario: number;
    su_IDRol: number;
    su_IDAreaServicio: number;
    su_areaServicioNombre: string;
    su_existe: boolean;
    constructor() { }
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
