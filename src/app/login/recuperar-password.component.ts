import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./login.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  frmRecuPass: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    // this.frmRecuPass = new FormGroup({
    //   usu_email: new FormControl(null, [
    //     Validators.required,
    //     Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
    //     ),
    // });
  }

  ngOnInit() {
    this.frmRecuPass = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
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

      this.loginService.emailRecupPass(this.f.email.value).subscribe(
        data => {
          if (!data) {
            Swal.fire({
              allowOutsideClick: false,
              type: 'warning',
              title: 'Recuperar Contraseña',
              text: 'El email ingresado no corresponde a un usuario registrado'
            });
          } else {
            Swal.fire({
              allowOutsideClick: false,
              type: 'success',
              title: 'Recuperar Contraseña',
              text:
                'Le hemos enviado un email para que pueda cambiar su contraseña'
            });

            this.router.navigateByUrl('/login');
          }
        },
        error => {
          Swal.fire({
            type: 'error',
            title: 'Error al iniciar sesión',
            text: error.message
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
