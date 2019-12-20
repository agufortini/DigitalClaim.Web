import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

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

  // OBJETOS PARA REGISTRAR RECLAMO
  objReclamo: any; // Objeto que contiene todos los atributos del reclamo
  objRec: any; // Objeto que se envia al método para registrar el reclamo
  objUsuario: Usuario;
  estado = false;

  // Variables para dar formato a horario para guardar historial
  getHour = new Date();
  getMin = new Date();

  constructor(private reclamoService: ReclamoService,
              private usuarioService: UsuarioService,
              private router: Router,
              private datePipe: DatePipe) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.objUsuario = JSON.parse(localStorage.getItem('objUsuario'));
    this.objReclamo = JSON.parse(localStorage.getItem('objReclamo'));
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
        text: 'Este proceso puede tardar unos segundos, espere por favor...'
      });
      Swal.showLoading();

      // Formato a horario
      this.horas = ((this.getHour.getHours() < 10 ? '0' : '') + this.getHour.getHours()).toString();
      this.minutos = ((this.getMin.getMinutes() < 10 ? '0' : '') + this.getMin.getMinutes()).toString();

      // Pregunta por Rol de Usuario, si es 1 corresponde a Usuario Ciudadano
      if (this.user.usu_IDRol === 1) {
        this.objRec = {
          // Se genera el objeto con los datos del Reclamo.
          rec_fechaAlta: this.fechaRec,
          rec_altura: +this.objReclamo.altura,
          rec_observaciones: (this.objReclamo.observaciones) ? this.objReclamo.observaciones : null,
          rec_IDTipoReclamo: +this.objReclamo.tipoReclamo.tipRec_IDTipoReclamo,
          rec_IDUsuario: this.user.usu_IDUsuario,
          rec_IDCanal: 3,
          cal_IDCalle: +this.objReclamo.calle.cal_IDCalle,
          bar_IDBarrio: +this.objReclamo.barrio.bar_IDBarrio,
          his_horaIngreso: this.horas + ':' + this.minutos,
          tipRec_nombre: this.objReclamo.tipoReclamo.tipRec_nombre,
          usu_boExiste: true,
          usu_nombre: this.user.usu_nombre,
          usu_email: this.user.usu_email
        };
      } else {
        // Si no es uno, entonces es un reclamo generado por un Usuario Municipal.
        this.objRec = {
          // Se genera el objeto Reclamo con los datos del Usuario Ciudadano y del Reclamo.
          // Datos Ciudadano.
          usu_username: this.objUsuario.usu_dni,
          usu_password: this.objUsuario.usu_dni,
          usu_dni: this.objUsuario.usu_dni,
          usu_nombre: this.objUsuario.usu_nombre,
          usu_apellido: this.objUsuario.usu_apellido,
          usu_telefono: this.objUsuario.usu_telefono,
          usu_email: this.objUsuario.usu_email,
          // Datos Reclamo.
          rec_fechaAlta: this.fechaRec,
          rec_altura: +this.objReclamo.altura,
          rec_observaciones: (this.objReclamo.observaciones) ? this.objReclamo.observaciones : null,
          rec_IDOrdenServicio: null,
          rec_IDTipoReclamo: +this.objReclamo.tipoReclamo.tipRec_IDTipoReclamo,
          rec_IDCanal: this.objReclamo.canal.can_IDCanal,
          cal_IDCalle: +this.objReclamo.calle.cal_IDCalle,
          bar_IDBarrio: +this.objReclamo.barrio.bar_IDBarrio,
          his_horaIngreso: this.horas + this.minutos,
          tipRec_nombre: this.objReclamo.tipoReclamo.tipRec_nombre,
          usu_boExiste: false
        };
      }

      this.reclamoService.registrarReclamo(this.objRec).subscribe(data => {
        const rec_codigo: number = +JSON.parse(data);

        Swal.close();

        if (this.user.usu_IDRol === 1) {
          Swal.fire({
            allowOutsideClick: false,
            type: 'success',
            title: 'Reclamo registrado' + '<br>' + rec_codigo,
            text: 'El reclamo ha sido registrado correctamente. El código mostrado en pantalla corresponde al de su reclamo. Se envió ' +
              'a su casilla de correo para que pueda consultarlo posteriormente.'
            }).then(result => {
            if (result.value) {
              this.router.navigateByUrl('/home');
              }
            });
        } else {
          Swal.fire({
            allowOutsideClick: false,
            type: 'success',
            title: 'Reclamo registrado' + '<br>' + rec_codigo,
            text: 'El reclamo ha sido registrado correctamente. Otórguele el código en pantalla al Ciudadano para que posteriormente pueda consultar el estado del mismo.'
            }).then(result => {
            if (result.value) {
              this.router.navigateByUrl('/generar-reclamo-datos-ciudadano');
              }
            });
        }

      });

      // Se pregunta si el objeto usuario contiene datos, se borra
      if (JSON.parse(localStorage.getItem('objUsuario')) !== null) {
        localStorage.removeItem('objUsuario');  
      }

      localStorage.removeItem('objReclamo');

    } catch (error) {
      console.log(error);
    }
  }

  cancelarEnvio() {
    const stRuta: string = (this.user.usu_IDRol === 1) ? '/generar-reclamo-ciudadano' : '/generar-reclamo-municipal';
    this.router.navigateByUrl(stRuta);
  }

}
