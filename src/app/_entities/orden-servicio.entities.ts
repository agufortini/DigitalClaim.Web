export class OrdenServicio {
    orServ_fechaAlta: string;
    orServ_fechaCierre: string;
    orServ_fechaVencimiento: string;
    orServ_observaciones: string;
    orServ_IDAreaServicio: number;
    orServ_IDEstadoOrdenServicio: number;
    constructor() {}
}

export class DetalleOrdServ {
    ordServ_IDOrdenServicio: number;
    ordServ_numero: number;
    ordServ_IDReclamo: number;
    ordServ_IDUsuario: number;
    constructor() { }
}
