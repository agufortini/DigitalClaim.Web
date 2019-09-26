import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// import { ValidarSesion } from '../_entities/login.entities';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  objLogin: any;
  objSesion: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.frmLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // OBTENCIÓN DE CONTROLES DEL FORMULARIO
  get f() {
    return this.frmLogin.controls;
  }

  onSubmit() {
    try {
      this.submitted = true;

      // VALIDACIÓN DE FORMULARIO
      if (this.frmLogin.invalid) {
        return;
      }

      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });

      Swal.showLoading();

      this.objSesion = {
        usu_username: this.f.username.value,
        usu_password: this.f.password.value
      };

      this.loginService.login(this.objSesion).subscribe(data => {
          this.objLogin = JSON.parse(data);

          if (this.objLogin) {
              if (this.objLogin.usu_IDRol === 1) {
                localStorage.setItem('ayuda', JSON.stringify(true));
                this.router.navigateByUrl('/home');
              } else if (this.objLogin.usu_IDRol === 2 || this.objLogin.usu_IDRol === 5) {
                this.router.navigateByUrl('/generar-reclamo');
              } else if (this.objLogin.usu_IDRol === 3 || this.objLogin.usu_IDRol === 6) {
                this.router.navigateByUrl('/crear-ordenServicio');
              }

              Swal.close();
              localStorage.setItem('currentUser', JSON.stringify(this.objLogin));
          } else {
            Swal.fire({
              type: 'error',
              title: 'Usuario y/o contraseña incorrectos'
            }).then(result => {
              if (result.value) {
                this.frmLogin.reset({
                  username: '',
                  password: ''
                });

                document.getElementById('txtUsuario').focus();
              }
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
