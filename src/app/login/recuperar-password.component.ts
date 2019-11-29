import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// ENTIDADES
import { RecuperarPassword } from '../_entities/usuario.entities';

// SERVICIOS
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./login.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  frmRecuPass: FormGroup;
  submitted = false;
  objEmail: RecuperarPassword;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {  }

  ngOnInit() {
    this.frmRecuPass = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get frmRecuperar() {
    return this.frmRecuPass.controls;
  }

  onSubmit() {
    try {
      this.submitted = true;
      // VALIDACIÓN DE FORMULARIO
      if (this.frmRecuPass.invalid) {
        return;
      }

      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      // Creación de objeto RecuperarPassword
      this.objEmail = new RecuperarPassword();
      this.objEmail.usu_email = this.frmRecuperar.email.value;

      this.loginService.recuperarPassword(this.objEmail).subscribe(data => {
       
        if (data === 'Mensaje enviado') {
            // Si existe usuario correspondiente a email ingresado
            Swal.fire({
              allowOutsideClick: false,
              type: 'success',
              title: 'Recuperar Contraseña',
              text:
                'Le hemos enviado un email con las instrucciones para que pueda recuperar su contraseña.'
            });
          } else {
            // Si no existe usuario correspondiente a email ingresado
            Swal.fire({
              allowOutsideClick: false,
              type: 'warning',
              title: 'Recuperar Contraseña',
              text: 'El email ingresado no corresponde a un usuario registrado.'
            });
          }

          this.router.navigateByUrl('/login');
        });
    } catch (error) {
      console.log(error);
    }
  }
}
