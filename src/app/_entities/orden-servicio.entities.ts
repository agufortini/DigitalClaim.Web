export class OrdenServicio {
    orServ_fechaAlta: string;
    orServ_fechaCierre: string;
    orServ_fechaVencimiento: string;
    orServ_observaciones: string;
    orServ_IDAreaServicio: number;
    orServ_IDEstado: number;
    constructor() {}
}

export class DetalleOrdServ {
    ordServ_IDOrdenServicio: number;
    ordServ_numero: number;
    ordServ_IDReclamo: number;
    ordServ_IDUsuario: number;
    constructor() { }
}

export class EstadoOrdenServicio {
    estOrd_IDEstado: number;
    estOrd_nombre: string;
    constructor() {}
}

export interface IEstadoOrdenServicio {
    estOrd_IDEstado: number;
    estOrd_nombre: string;
}

