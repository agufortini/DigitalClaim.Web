import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import Swal from 'sweetalert2';

// ENTITIES
import { Usuario } from '../../_entities/usuario.entities';
import { Contacto } from '../../_entities/contacto.entities';

// SERVICES
import { ReclamoService } from '../../services/reclamo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  frmContacto: FormGroup;
  user: Usuario;
  objContacto: Contacto;


  constructor(private formBuilder: FormBuilder,
              private reclamoService: ReclamoService,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.frmContacto = this.formBuilder.group({
      nombreCompleto: [this.user.usu_nombre + ' ' + this.user.usu_apellido, Validators.required],
      telefono: [this.user.usu_telefono, Validators.required],
      email: [this.user.usu_email, Validators.required],
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

      this.reclamoService.registrarConsulta(this.objContacto).subscribe((data) => {
        if (data) {
          Swal.close();
          Swal.fire({
            allowOutsideClick: false,
            type: 'success',
            title: 'Mensaje enviado',
            text: 'El mensaje se ha enviado con éxito. Su consulta será revisada y le daremos una respuesta cuanto antes.'
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
