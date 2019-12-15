import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

// ENTITIES
import { Usuario } from '../../_entities/usuario.entities';
import { Contacto } from '../../_entities/contacto.entities';

// SERVICES
import { ReclamoService } from '../../services/reclamo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [DatePipe]
})
export class ContactoComponent implements OnInit {

  frmContacto: FormGroup;
  user: Usuario;
  objContacto: Contacto;
  fechaHoy = new Date();


  constructor(private formBuilder: FormBuilder,
              private reclamoService: ReclamoService,
              private router: Router,
              private datePipe: DatePipe) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.frmContacto = this.formBuilder.group({
      nombreCompleto: [{ value: this.user.usu_nombre + ' ' + this.user.usu_apellido, disabled: true}, Validators.required],
      telefono: [{ value: this.user.usu_telefono, disabled: true}, Validators.required],
      email: [{ value: this.user.usu_email, disabled: true}, Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(30)]]
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() { return this.frmContacto.controls; }

  registrarConsulta() {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objContacto = new Contacto();
      this.objContacto.con_IDUsuario = this.user.usu_IDUsuario;
      this.objContacto.con_mensaje = this.f.mensaje.value;
      this.objContacto.con_fechaAlta = this.datePipe.transform(this.fechaHoy, 'dd/MM/yyyy');

      this.reclamoService.registrarConsulta(this.objContacto).subscribe((data) => {
        const rtdo: number = JSON.parse(data);
        
        if (rtdo === 1) {
          Swal.close();
          Swal.fire({
            allowOutsideClick: false,
            type: 'success',
            title: 'Mensaje enviado',
            text: 'El mensaje se ha enviado con éxito. Su consulta será revisada y le enviaremos una respuesta a su correo.'
          }).then(result => {
            if (result.value) {
              this.frmContacto.reset({
                mensaje: ''
              });
              this.router.navigateByUrl('/home');
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
