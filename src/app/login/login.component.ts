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
  submitted = false;

  // Variables utilizadas para crear la Sesion de Usurio al loguearse
  objSesionUsuario: SesionUsuario;
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
      password: ['', Validators.required],
      providers: [DatePipe]
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

      // Se inicializan los campos relacionados a fecha, hora y minutos
      this.fechaActual = new Date();
      this.horas = ((this.getHour.getHours() < 10 ? '0' : '') + this.getHour.getHours()).toString();
      this.minutos = ((this.getMin.getMinutes() < 10 ? '0' : '') + this.getMin.getMinutes()).toString();

      // Se crea el objeto Sesión Usuario
      this.objSesionUsuario = new SesionUsuario();
      this.objSesionUsuario.su_username = this.frmSesion.username.value;
      this.objSesionUsuario.su_password = this.frmSesion.password.value;
      this.objSesionUsuario.su_fechaInicio = this.datePipe.transform(this.fechaActual, 'dd/MM/yyyy');
      this.objSesionUsuario.su_horaInicio = this.horas + ':' + this.minutos;
      this.objSesionUsuario.su_fechaFin = null;
      this.objSesionUsuario.su_horaFin = null;

      this.loginService.login(this.objSesionUsuario).subscribe(data => {
        const objSesion: SesionUsuario = JSON.parse(data);
        
        if (objSesion !== null) {

          if (objSesion.su_IDRol === 1) {
            localStorage.setItem('ayuda', JSON.stringify(true));
            this.router.navigateByUrl('/home');
          } else if (objSesion.su_IDRol === 2 || objSesion.su_IDRol === 5) {
            this.router.navigateByUrl('/generar-reclamo-municipal');
          } else if (objSesion.su_IDRol === 3 || objSesion.su_IDRol === 6) {
            this.router.navigateByUrl('/crear-orden-servicio');
          }

          Swal.close();
          localStorage.setItem('currentUser', JSON.stringify(objSesion));
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
      });
    } catch (error) {
      console.log(error);
    }
  }
}
