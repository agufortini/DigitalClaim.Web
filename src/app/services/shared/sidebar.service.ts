import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuReclamo: any = [
    {
      titulo: 'Reclamo',
      icono: 'mdi mdi-file-outline',
      subMenu: [
        { titulo: 'Registrar', url: '/generar-reclamo' },
        { titulo: 'Consultar', url: '/consultar-reclamo' },
      ]
    }
  ];

  menuOrdServ: any = [
    {
      titulo: 'Orden de Servicio',
      icono: 'mdi mdi-file-outline',
      subMenu: [
        { titulo: 'Registrar', url: '/crear-orden-servicio' },
        { titulo: 'Gestionar', url: '/gestionar-orden-servicio' },
      ]
    }
  ];

  constructor() { }
}
