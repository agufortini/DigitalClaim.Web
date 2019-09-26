import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// SERVICIOS
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  frmRegistro: FormGroup;
  submitted = false;
  objUser: any = {};

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: UsuarioService) { }

  ngOnInit() {

    // AGREGAR VALIDACIONES FALTANTES QUE GENERAN ERRORES

    this.frmRegistro = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      repetirPassword: [null, Validators.required],
      dni: [null, Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      telefono: [null],
      email: [null, Validators.required],
    });

    /* VALIDACION EMAIL */
    // , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')

    /* METODO COMPARADOR DE CONTRASEÑAS */
    // , { validators: this.compararContrasenia('usu_password', 'usu_repetirPassword') }

    // this.frm = new FormGroup({

    //   usu_userName: new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(6)]
    //   ),
    //   usu_password: new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(6)]
    //     ),
    //   usu_repetirPassword: new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(6)]
    //     ),
    //    usu_nombre: new FormControl(null, Validators.required),
    //    usu_apellido: new FormControl(null, Validators.required),
    //   usu_telefono: new FormControl(null),
    //   usu_email: new FormControl(null, [
    //     Validators.required,
    //     Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
    //     ),

    // }, { validators: this.compararContrasenia('usu_password', 'usu_repetirPassword') });

  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() { return this.frmRegistro.controls; }

  onSubmit() {

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.submitted = true;

    // VALIDACIÓN DE FORMULARIO
    if (this.frmRegistro.invalid) {
        return;
    }

    // this.objUser = new UsuarioV();
    this.objUser = {
      usu_username: this.f.username.value,
      usu_password: this.f.password.value,
      usu_dni: this.f.dni.value,
      usu_nombre: this.f.nombre.value,
      usu_apellido: this.f.apellido.value,
      usu_telefono: this.f.telefono.value,
      usu_email: this.f.email.value
    };

    this.loginService.registrarUsuario(this.objUser).subscribe(
    (data) => {

      const rtdo = JSON.parse(data);

      if (rtdo !== 'Usuario existente') {

        Swal.close();
        Swal.fire(
          'Registro',
          'Usuario' + this.objUser.usu_username + ' creado con éxito!',
          'success'
        );

        this.router.navigateByUrl('/login');

      } else {

        Swal.close();
        Swal.fire(
          'Registro',
          'El usuario ' + this.objUser.usu_username + ' ya existe',
          'warning'
        );

        this.router.navigateByUrl('/login');

      }
    },
    (error) => {
     Swal.fire({
       type: 'error',
       title: 'Registro',
       text: error.message
       });
    });

  }

  // compararPassword(password1: string, password2: string) {

  //   return (group: FormGroup) => {

  //     const pass1 = group.controls[password1].value;
  //     const pass2 = group.controls[password2].value;

  //     if (pass1 === pass2) {
  //       return null;
  //     }

  //     return {
  //       sonIguales: true
  //     };

  //   };

  // }



}
