export class PersonalPorOrdenServicio {
    perOrd_numeroOrdenServicio: number;
    perOrd_fechaInicioOrdenServicio: string;
    perOrd_fechaFinOrdenServicio: string;
    perOrd_IDTipoPersonal: number;
    perOrd_IDOrdenServicio: number;
    constructor() { }
}

export class PersonalOrdServ {
    per_IDPersonal: number;
    per_numOrdServ: number;
    per_IDOrdenServicio: number;
    constructor() {}
}
