import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

// ENTIDADES
import { Usuario } from 'src/app/_entities/usuario.entities';
import { Reclamo, EnviarEmail } from '../../_entities/reclamo.entities';

// SERVICIOS
import { ReclamoService } from '../../services/reclamo.service';

@Component({
  selector: 'app-registrar-reclamo',
  templateUrl: './registrar-reclamo.component.html',
  styleUrls: ['./registrar-reclamo.component.css'],
  providers: [DatePipe]
})
export class RegistrarReclamoComponent implements OnInit {
  user: Usuario;
  splitted: any;
  IDRecyCod: any;
  fechaHoy = new Date();
  fechaRec: any;
  boBand = false;
  horas: string;
  minutos: string;
  IDUsuario: number;
  IDCanal: number;
  boExiste: boolean;

  // OBJETOS PARA REGISTRAR RECLAMO
  objRec: any = {};
  objUser: any;
  objReclamo: any;
  estado = false;

  // Variables para dar formato a horario para guardar historial
  getHour = new Date();
  getMin = new Date();

  constructor(private reclamoService: ReclamoService,
              private router: Router,
              private datePipe: DatePipe) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.objUser = JSON.parse(localStorage.getItem('datosUsuario'));
    this.objRec = JSON.parse(localStorage.getItem('datosReclamo'));
  }

  ngOnInit() {
    this.fechaRec = new Date();
    this.fechaRec = this.datePipe.transform(this.fechaRec, 'dd/MM/yyyy');
  }

  registrarReclamo() {
    try {
      if (this.user.usu_IDRol !== 1) {
        // CREACION DE OBJETO USUARIO EN CASO QUE SEA RECLAMO MUNICIPAL
        this.objReclamo = {
          usu_username: this.objUser.dni,
          usu_password: this.objUser.dni,
          usu_dni: this.objUser.dni,
          usu_nombre: this.objUser.ombre,
          usu_apellido: this.objUser.apelido,
          usu_telefono: this.objUser.telefono,
          usu_email: this.objUser.email,
          usu_IDRol: 1
        };
      }

      // Formato a horario
      this.horas = ((this.getHour.getHours() < 10 ? '0' : '') + this.getHour.getHours()).toString();
      this.minutos = ((this.getMin.getMinutes() < 10 ? '0' : '') + this.getMin.getMinutes()).toString();

      this.objReclamo = {
        // CREACION DE OBJETO RECLAMO
        rec_fechaAlta: this.fechaRec,
        rec_altura: +this.objRec.altura,
        rec_observaciones: (this.objRec.observaciones) ? this.objRec.observaciones : null,
        rec_IDOrdenServicio: null,
        rec_IDTipoReclamo: +this.objRec.tipoReclamo.tipRec_IDTipoReclamo,

        // CAMPOS RESTANTES
        usu_IDUsuario: (this.user.usu_IDRol === 1) ? this.user.usu_IDUsuario : 0,
        can_IDCanal: (this.user.usu_IDRol === 1) ? 3 : this.objRec.canal.can_IDCanal,
        cal_IDCalle: +this.objRec.calle.cal_IDCalle,
        bar_IDBarrio: +this.objRec.barrio.bar_IDBarrio,
        his_horaIngreso: this.horas + this.minutos,
        tipRec_nombre: this.objRec.tipoReclamo.tipRec_nombre,
        usu_boExiste: (this.user.usu_IDRol === 1) ? true : false
      };

      this.reclamoService.registrarReclamo(this.objReclamo).subscribe(data => {
        if (data) {
          this.IDRecyCod = JSON.parse(data);
        }
        this.splitted = this.IDRecyCod.split(';', 2);

        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          type: 'success',
          title: 'Reclamo registrado' + '<br>' + this.splitted[1],
          text: 'El reclamo ha sido registrado correctamente. El código mostrado en pantalla corresponde al de su reclamo. Se envió ' +
            'a su casilla de correo para que pueda consultarlo posteriormente.'
          }).then(result => {
          if (result.value) {
            this.router.navigateByUrl('/home');
            }
          });
      });

      localStorage.removeItem('datosReclamo');
    } catch (error) {
      console.log(error);
    }
  }

  cancelarEnvio() {
    localStorage.removeItem('datosReclamo');
    if (this.user.usu_IDRol === 1) {
      this.router.navigateByUrl('/generar-reclamo-ciudadano');
    } else {
      this.router.navigateByUrl('/generar-reclamo-municipal');
    }
  }

}
