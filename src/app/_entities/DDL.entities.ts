export class TipoReclamo {
    tipRec_IDTipoReclamo: number;
    tipRec_nombre: string;
    tipRec_IDAreaServicio: number;
    tipRec_IDPrioridad: number;
    constructor() { }
}

export class Prioridad {
    pri_IDPrioridad: number;
    pri_nombre: string;
    constructor() { }
}

export class Barrio {
    bar_IDBarrio: number;
    bar_nombre: string;
    constructor() { }
}
