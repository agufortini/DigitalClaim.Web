/* -------------------------------------------------- CLASES -------------------------------------------------- */

// Validar Reclamo

export class ValidarReclamo {
    rec_IDReclamo: number;
    rec_altura: number;
    rec_IDCalle: number;
    rec_IDBarrio: number;
    rec_IDTipoReclamo: number;
    rec_estado: string;
    constructor() { }
}

// Registrar Reclamo

export class Reclamo {
    rec_fechaAlta: string;
    rec_altura: number;
    rec_observaciones: string;
    rec_IDTicket: number;
    rec_IDOrdenServicio: number;
    rec_IDTipoReclamo: number;
    rec_IDCallePorBarrio: number;
    constructor() {}
}

// Consultar Reclamo (Usuario Municipal)

export class ConsultarReclamo {
    rec_fechaDesde: string;
    rec_fechaHasta: string;
    usu_DNI: number;
    rec_codigo: number;
    arServ_ID: number;
    bar_ID: number;
    constructor() {}
}

export class EnviarEmail {
    rec_codigo: number;
    rec_fechaAlta: string;
    tipRec_nombre: string;
    usu_nombre: string;
    usu_apellido: string;
    usu_email: string;
    estRec_nombre: string;
    constructor() {}
}


// Modal Estado Reclamo

export class ReclamoC {
    rec_IDReclamo: number;
    rec_codigo: number;
    rec_fechaAlta: string;
    arServ_nombre: string;
    tipRec_nombre: string;
    cal_nombre: string;
    rec_altura: string;
    rec_direccion: string;
    bar_nombre: string;
    estRec_nombre: string;
    tic_IDUsuario: number;
    constructor() {}
}

// Estado Reclamo

export class EstadoReclamo {
    estRec_IDEstado: number;
    estRec_nombre: string;
    constructor() {}
}

/* -------------------------------------------------- INTERFACES -------------------------------------------------- */

export interface ConsultarReclamo {
    rec_IDReclamo: number;
    rec_codigo: number;
    rec_fechaAlta: string;
    arServ_ID: number;
    arServ_nombre: string;
    tipRec_nombre: string;
    rec_direccion: string;
    bar_ID: number;
    bar_nombre: string;
    usu_DNI: number;
}

export interface ReclamoPendiente {
    rec_IDReclamo: number;
    rec_fechaAlta: string;
    tipRec_IDTipoReclamo: number;
    tipRec_nombre: string;
    rec_direccion: string;
    pri_IDPrioridad: number;
    bar_IDBarrio: number;
    bar_nombre: string;
}

// ABMS

export interface ITipoReclamo {
    tipRec_IDTipoReclamo: number;
    tipRec_nombre: string;
}

export interface IEstadoReclamo {
    estRec_IDEstado: number;
    estRec_nombre: string;
}
