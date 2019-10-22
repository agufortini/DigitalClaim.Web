export class Personal {
    per_IDPersonal: number;
    per_dni: number;
    per_nombre: string;
    per_apellido: string;
    per_telefono: number;
    per_IDAreaServicio: number;
    constructor() { }
}

export interface IPersonal {
    per_dni: number;
    per_nombre: string;
    per_apellido: string;
    per_telefono: number;
}
