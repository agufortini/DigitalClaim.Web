import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

// ENTIDADES
import { Usuario } from 'src/app/_entities/usuario.entities';
import { Ticket } from '../../_entities/ticket.entities';
import { CallePorBarrio } from 'src/app/_entities/calle-por-barrio.entities';
import { Reclamo } from '../../_entities/reclamo.entities';
import { Historial } from '../../_entities/historial.entities';
import { EnviarEmailCodigo } from '../../_entities/enviar-email-codigo.entities';

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
  datosRec: any;
  objRec: any = {};
  splitted: any;
  IDRecyCod: any;
  fechaHoy = new Date();
  fechaRec: any;
  boBand = false;

  // OBJETOS PARA REGISTRAR RECLAMO
  objTicket: Ticket;
  objCalBar: CallePorBarrio;
  objReclamo: Reclamo;
  objHistorial: Historial;
  objEnviarEmail: EnviarEmailCodigo;

  estado = false;

  // Variables para dar formato a horario para guardar historial
  getHour = new Date();
  getMin = new Date();

  constructor(private reclamoService: ReclamoService,
              private router: Router,
              private datePipe: DatePipe) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.objRec = JSON.parse(localStorage.getItem('datosReclamo'));
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

      // CREACION DE OBJETO RECLAMO
      this.objReclamo = new Reclamo();
      this.objReclamo.rec_fechaAlta = this.fechaRec;
      this.objReclamo.rec_altura = +this.objRec.altura;
      this.objReclamo.rec_observaciones = (this.objRec.observaciones) ? this.objRec.observaciones : null;
      this.objReclamo.rec_IDOrdenServicio = null;
      this.objReclamo.rec_IDTipoReclamo = +this.objRec.tipoReclamo.tipRec_IDTipoReclamo;
      this.objReclamo.rec_IDEstadoReclamo = 1;
      this.objReclamo.rec_IDRating = null;

      // CREACION DE OBJETO TICKET
      this.objTicket = new Ticket();
      this.objTicket.tic_IDUsuario = +this.user.usu_IDUsuario;

      if (this.user.usu_IDRol === 1) {
        this.objTicket.tic_IDCanal = 3;
      } else {
        this.objTicket.tic_IDCanal = +this.objRec.canal.can_IDCanal;
      }

      // REGISTRO DE TICKET
      this.reclamoService.registrarTicket(this.objTicket).subscribe(dataTicket => {
          if (dataTicket) {
            this.objReclamo.rec_IDTicket = +dataTicket;
          }

          // CREACION DE OBJETO CALLE POR BARRIO
          this.objCalBar = new CallePorBarrio();
          this.objCalBar.calBar_IDCalle = +this.objRec.calle.cal_IDCalle;
          this.objCalBar.calBar_IDBarrio = +this.objRec.barrio.bar_IDBarrio;

          // SELECT ID CALLE POR BARRIO
          this.reclamoService.selectCallePorBarrio(this.objCalBar).subscribe(dataCPB => {
              const objIDCalBar = JSON.parse(dataCPB);
              if (dataCPB) {
                this.objReclamo.rec_IDCallePorBarrio = +objIDCalBar.calBar_IDCallePorBarrio;
              }

              // REGISTRO DE RECLAMO
              this.reclamoService.registrarReclamo(this.objReclamo).subscribe(dataRec => {
                  if (dataRec) {
                    this.IDRecyCod = JSON.parse(dataRec);
                  }
                  this.splitted = this.IDRecyCod.split(';', 2);

                  // CREACION DE OBJETO HISTORIAL
                  this.objHistorial = new Historial();
                  this.objHistorial.his_fechaIngreso = this.fechaRec;

                  // Formato a horario
                  let hour = '';
                  let min = '';
                  hour = ((this.getHour.getHours() < 10 ? '0' : '') + this.getHour.getHours()).toString();
                  min = ((this.getMin.getMinutes() < 10 ? '0' : '') + this.getMin.getMinutes()).toString();

                  this.objHistorial.his_horaIngreso = hour + ':' + min;
                  this.objHistorial.his_observaciones = 'Notificado en Area de Servicio';
                  this.objHistorial.his_IDOrdenServicio = 0;
                  this.objHistorial.his_IDReclamo = this.splitted[0];

                  // REGISTRO DE HISTORIAL
                  this.reclamoService.registrarHistorial(this.objHistorial).subscribe((dataHis) => {
                    if (this.user.usu_IDRol === 1) {
                      // ENVIAR EMAIL CODIGO DE REGISTRO DE RECLAMO
                      this.objEnviarEmail = new EnviarEmailCodigo();
                      this.objEnviarEmail.usu_nombreCompleto = this.user.usu_nombre + ' ' + this.user.usu_apellido;
                      this.objEnviarEmail.tipRec_nombre = this.objRec.tipoReclamo.tipRec_nombre;
                      this.objEnviarEmail.usu_email = this.user.usu_email;
                      this.objEnviarEmail.rec_codigo = this.splitted[1];
                      this.objEnviarEmail.rec_fechaAlta = this.fechaRec;

                      this.reclamoService.enviarEmailCodigo(this.objEnviarEmail).subscribe(
                        (data) => {
                          if (data) {
                            Swal.close();
                            Swal.fire({
                              allowOutsideClick: false,
                              type: 'success',
                              title: 'Reclamo registrado',
                              text: 'El reclamo ha sido registrado correctamente. Le hemos enviado un email con el código del mismo: '
                                + this.objEnviarEmail.rec_codigo + '. Consérvelo para poder llevar a cabo el seguimiento de su reclamo.'
                            }).then(result => {
                              if (result.value) {
                                this.router.navigateByUrl('/home');
                              }
                            });
                          } else {
                            console.log('El email no se envió');
                          }
                        }
                      );
                    } else {
                      Swal.close();
                      Swal.fire({
                        allowOutsideClick: false,
                        type: 'success',
                        title: 'Reclamo registrado',
                        text: 'El reclamo ha sido registrado correctamente. El código del mismo es: ' + this.splitted[1]
                      }).then(result => {
                        if (result.value) {
                          this.router.navigateByUrl('/generar-reclamo');
                        }
                      });
                    }

                    localStorage.removeItem('datosReclamo');
                    }
                  );
                });
            });
        });
    } catch (error) {
      console.log(error);
    }
  }

  cancelarEnvio() {
    localStorage.removeItem('datosReclamo');
    this.router.navigateByUrl('/generar-reclamo');
  }

}
