import { Component, OnInit } from '@angular/core';

// SERVICIOS
import { SidebarService } from '../../services/service.index';
import { OrdenServicioService } from '../../services/orden-servicio.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {

  user: any;
  areaServicio: string;

  // PROPIEDADES UTILIZADAS PARA CORROBORAR QUE EL USUARIO NO REGISTRE MAS DE 1 RECLAMO POR DIA
  fechaRealizacion: any;
  objIDUser: any;
  fechaHoy: any;

  constructor(public sideBar: SidebarService,
              public ordServ: OrdenServicioService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    try {
      // ASIGNACION DE NOMBRE DE AREA DE SERVICIO A LABEL EN SIDEBAR
      if (this.user.usu_IDAreaServicio !== null) {
        this.areaServicio = this.user.usu_arServNombre;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
