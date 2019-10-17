/* -------------------- CLASES -------------------- */

export class ValidarReclamo {
    rec_IDReclamo: number;
    rec_altura: number;
    rec_IDCalle: number;
    rec_IDBarrio: number;
    rec_IDTipoReclamo: number;
    rec_estado: string;
    constructor() { }
}

export class Reclamo {
    rec_fechaAlta: string;
    rec_altura: number;
    rec_observaciones: string;
    rec_IDTicket: number;
    rec_IDOrdenServicio: number;
    rec_IDTipoReclamo: number;
    rec_IDCallePorBarrio: number;
    rec_IDEstadoReclamo: number;
    rec_IDRating: number;
}

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

export class ReclamoPendiente {
    rec_IDReclamo: number;
    rec_fechaAlta: string;
    tipRec_IDTipoReclamo: number;
    tipRec_nombre: string;
    rec_altura: number;
    cal_nombre: string;
    rec_direccion: string;
    pri_IDPrioridad: number;
    bar_IDBarrio: number;
    bar_nombre: string;
    constructor() {}
}

/* -------------------- INTERFACES -------------------- */

export interface ConsultarReclamo {
    rec_IDReclamo: number;
    rec_codigo: number;
    rec_fechaAlta: string;
    arServ_nombre: string;
    tipRec_nombre: string;
    rec_direccion: string;
    bar_nombre: string;
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

export interface ITipoReclamo {
    tipRec_IDTipoReclamo: number;
    tipRec_nombre: string;
}
