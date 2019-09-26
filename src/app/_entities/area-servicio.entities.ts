export class AreaServicio {
    arServ_IDAreaServicio: number;
    arServ_cuit: number;
    arServ_nombre: string;
    arServ_domicilioFiscal: string;
    arServ_telefono: number;
    arServ_email: string;
    constructor() {}
}

export interface IAreaServicio {
    arServ_IDAreaServicio: number;
    arServ_nombre: string;
}
