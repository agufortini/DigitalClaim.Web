import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// ENTIDADES
import { Usuario } from '../_entities/usuario.entities';

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
  objUsuario: Usuario;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: UsuarioService) { }

  ngOnInit() {
    this.frmRegistro = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      email: ['', Validators.required]
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get frmRegister() { return this.frmRegistro.controls; }

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

    // Creación de objeto Usuario
    this.objUsuario = new Usuario();
    this.objUsuario.usu_username = this.frmRegister.username.value;
    this.objUsuario.usu_password = this.frmRegister.password.value;
    this.objUsuario.usu_dni = this.frmRegister.dni.value;
    this.objUsuario.usu_nombre = this.frmRegister.nombre.value;
    this.objUsuario.usu_apellido = this.frmRegister.apellido.value;
    this.objUsuario.usu_telefono = this.frmRegister.telefono.value;
    this.objUsuario.usu_email = this.frmRegister.email.value;

    // Se llama al método para registrar un nuevo usuario
    this.loginService.registrarUsuario(this.objUsuario).subscribe(data => {
      const rtdo = JSON.parse(data);

      if (rtdo !== 'Usuario existente') {
        Swal.close();
        Swal.fire(
          'Registro',
          'Usuario ' + this.objUsuario.usu_username + ' creado con éxito!',
          'success'
        );
      } else {
        Swal.close();
        Swal.fire(
          'Registro',
          'El usuario ' + this.objUsuario.usu_username + ' ya existe',
          'warning'
        );
      }

      this.router.navigateByUrl('/login');
    });
  }

  // Método utilizado para comparar que las contraseñas ingresadas sean iguales
  /*{ validators: this.compararContrasenia('usu_password', 'usu_repetirPassword') }
 
  compararPassword(password1: string, password2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[password1].value;
      const pass2 = group.controls[password2].value;
  
      if (pass1 === pass2) {
        return null;
      }
      return {
      sonIguales: true
      };
    };
  }*/

  // VALIDACION CONTROL NUMEROS
  validarIngreso(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
