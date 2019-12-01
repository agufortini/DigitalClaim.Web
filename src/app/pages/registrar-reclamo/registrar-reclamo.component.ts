import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

// ENTIDADES
import { Usuario } from 'src/app/_entities/usuario.entities';
import { Reclamo, EnviarEmail } from '../../_entities/reclamo.entities';

// SERVICIOS
import { ReclamoService } from '../../services/reclamo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-reclamo',
  templateUrl: './registrar-reclamo.component.html',
  styleUrls: ['./registrar-reclamo.component.css'],
  providers: [DatePipe]
})
export class RegistrarReclamoComponent implements OnInit {
  user: Usuario;
  splitted: any;
  fechaHoy = new Date();
  fechaRec: any;
  boBand = false;
  horas: string;
  minutos: string;
  IDUsuario: number;
  IDCanal: number;
  boExiste: boolean;
  codRec: number;

  // OBJETOS PARA REGISTRAR RECLAMO
  objRec: any = {};
  objUser: any;
  objReclamo: any;
  objUsuario: any;
  estado = false;

  // Variables para dar formato a horario para guardar historial
  getHour = new Date();
  getMin = new Date();

  constructor(private reclamoService: ReclamoService,
              private usuarioService: UsuarioService,
              private router: Router,
              private datePipe: DatePipe) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.objUser = JSON.parse(localStorage.getItem('objUsuario'));
    this.objRec = JSON.parse(localStorage.getItem('objReclamo'));
  }

  ngOnInit() {
    this.fechaRec = new Date();
    this.fechaRec = this.datePipe.transform(this.fechaRec, 'dd/MM/yyyy');
  }

  registrarReclamo() {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      // Formato a horario
      this.horas = ((this.getHour.getHours() < 10 ? '0' : '') + this.getHour.getHours()).toString();
      this.minutos = ((this.getMin.getMinutes() < 10 ? '0' : '') + this.getMin.getMinutes()).toString();

      // Pregunta por Rol de Usuario
      if (this.user.usu_IDRol === 1) {
        this.objReclamo = {
          // Creación de objeto Reclamo
          rec_fechaAlta: this.fechaRec,
          rec_altura: +this.objRec.altura,
          rec_observaciones: (this.objRec.observaciones) ? this.objRec.observaciones : null,
          rec_IDOrdenServicio: null,
          rec_IDTipoReclamo: +this.objRec.tipoReclamo.tipRec_IDTipoReclamo,

          // Campos restantes que se incluyen en el registro del Reclamo
          usu_IDUsuario: this.user.usu_IDUsuario,
          can_IDCanal: 3,
          cal_IDCalle: +this.objRec.calle.cal_IDCalle,
          bar_IDBarrio: +this.objRec.barrio.bar_IDBarrio,
          his_horaIngreso: this.horas + ':' + this.minutos,
          tipRec_nombre: this.objRec.tipoReclamo.tipRec_nombre,
          usu_boExiste: true,
          usu_nombre: this.user.usu_nombre,
          usu_email: this.user.usu_email,
          estRec_nombre: this.objRec.tipoReclamo.tipRec_nombre
        };
      } else {
        // CREACION DE OBJETO USUARIO EN CASO QUE SEA RECLAMO MUNICIPAL
        this.objUsuario = {
          usu_username: this.objUser.dni,
          usu_password: this.objUser.dni,
          usu_dni: this.objUser.dni,
          usu_nombre: this.objUser.nombre,
          usu_apellido: this.objUser.apellido,
          usu_telefono: this.objUser.telefono,
          usu_email: this.objUser.email,
          usu_IDRol: 1
        };

        this.usuarioService.registrarUsuario(this.objUsuario).subscribe(data => {
          console.log(data);

          // if (data > 0) {
          //   this.objReclamo = {
          //     // CREACION DE OBJETO RECLAMO
          //     rec_fechaAlta: this.fechaRec,
          //     rec_altura: +this.objRec.altura,
          //     rec_observaciones: (this.objRec.observaciones) ? this.objRec.observaciones : null,
          //     rec_IDOrdenServicio: null,
          //     rec_IDTipoReclamo: +this.objRec.tipoReclamo.tipRec_IDTipoReclamo,

          //     // CAMPOS RESTANTES
          //     usu_IDUsuario: +data,
          //     can_IDCanal: this.objRec.canal.can_IDCanal,
          //     cal_IDCalle: +this.objRec.calle.cal_IDCalle,
          //     bar_IDBarrio: +this.objRec.barrio.bar_IDBarrio,
          //     his_horaIngreso: this.horas + this.minutos,
          //     tipRec_nombre: this.objRec.tipoReclamo.tipRec_nombre,
          //     usu_boExiste: false,
          //     usu_nombre: this.objUser.nombre,
          //     usu_email: this.objUser.email,
          //     estRec_nombre: this.objRec.tipoReclamo.tipRec_nombre
          //   };
          // }
        });
      }

      // this.reclamoService.registrarReclamo(this.objReclamo).subscribe(data => {
      //   if (data) {
      //     this.codRec = +JSON.parse(data);
      //   }

      //   Swal.close();
      //   Swal.fire({
      //     allowOutsideClick: false,
      //     type: 'success',
      //     title: 'Reclamo registrado' + '<br>' + this.codRec,
      //     text: 'El reclamo ha sido registrado correctamente. El código mostrado en pantalla corresponde al de su reclamo. Se envió ' +
      //       'a su casilla de correo para que pueda consultarlo posteriormente.'
      //     }).then(result => {
      //     if (result.value) {
      //       this.router.navigateByUrl('/home');
      //       }
      //     });
      // });

      localStorage.removeItem('objReclamo');

    } catch (error) {
      console.log(error);
    }
  }

  cancelarEnvio() {
    if (this.user.usu_IDRol === 1) {
      this.router.navigateByUrl('/generar-reclamo-ciudadano');
    } else {
      this.router.navigateByUrl('/generar-reclamo-municipal');
    }
  }

}
