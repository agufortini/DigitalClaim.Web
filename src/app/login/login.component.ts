import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

// ENTIDADES
import { SesionUsuario } from '../_entities/usuario.entities';

// SERVICIOS
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  objLogin: any;
  objSesion: SesionUsuario;
  submitted = false;

  fechaActual: any;
  horas: string;
  minutos: string;
  getHour = new Date();
  getMin = new Date();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.frmLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // OBTENCIÓN DE CONTROLES DEL FORMULARIO
  get frmSesion() {
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

      // Se inicializa Fecha y Hora actual para Registrar Inicio de Sesión de Usuario
      this.fechaActual = new Date();
      this.fechaActual = this.datePipe.transform(this.fechaActual, 'dd/MM/yyyy');
      this.horas = ((this.getHour.getHours() < 10 ? '0' : '') + this.getHour.getHours()).toString();
      this.minutos = ((this.getMin.getMinutes() < 10 ? '0' : '') + this.getMin.getMinutes()).toString();
        
      this.objSesion = new SesionUsuario();
      this.objSesion.su_fechaInicio = this.fechaActual;
      this.objSesion.su_horaInicio = this.horas + ':' + this.minutos;

      this.objLogin = {
         usu_username: this.frmSesion.username.value,
         usu_password: this.frmSesion.password.value,
         su_fechaInicio: this.objSesion.su_fechaInicio,
         su_horaInicio: this.objSesion.su_horaInicio
      };

      this.loginService.login(this.objLogin).subscribe(data => {
          const objLogin = JSON.parse(data);

          if (objLogin.usu_existe) {
  
              if (objLogin.usu_IDRol === 1) {
                localStorage.setItem('ayuda', JSON.stringify(true));
                this.router.navigateByUrl('/home');
              } else if (objLogin.usu_IDRol === 2 || objLogin.usu_IDRol === 5) {
                this.router.navigateByUrl('/generar-reclamo-municipal');
              } else if (objLogin.usu_IDRol === 3 || objLogin.usu_IDRol === 6) {
                this.router.navigateByUrl('/crear-orden-servicio');
              }

              Swal.close();
              localStorage.setItem('currentUser', JSON.stringify(objLogin));
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
