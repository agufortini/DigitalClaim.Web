import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// ENTIDADES
import { Usuario } from '../../_entities/usuario.entities';

// SERVICIOS
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  frmPerfil: FormGroup;
  user: Usuario;
  objUser: Usuario;

  // NG MODEL
  inputDNI = '';
  inputUser = '';
  inputPass = '';
  inputNombre = '';
  inputApellido = '';
  inputTel = '';
  inputEmail = '';

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.frmPerfil = this.formBuilder.group({
      dni: [null, Validators.required],
      usuario: [null, Validators.required],
      password: [null, Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      telefono: [null, Validators.required],
      email: [null, Validators.required]
    });

    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.inputDNI = this.user.usu_dni.toString();
    this.inputUser = this.user.usu_username;
    this.inputPass = this.user.usu_password;
    this.inputNombre = this.user.usu_nombre;
    this.inputApellido = this.user.usu_apellido;
    this.inputTel = this.user.usu_telefono.toString();
    this.inputEmail = this.user.usu_email;
  }

  guardarDatos() {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objUser = new Usuario();
      this.objUser.usu_IDUsuario = this.user.usu_IDUsuario;
      this.objUser.usu_dni = +this.inputDNI;
      this.objUser.usu_username = this.inputUser;
      this.objUser.usu_password = this.inputPass;
      this.objUser.usu_nombre = this.inputNombre;
      this.objUser.usu_apellido = this.inputApellido;
      this.objUser.usu_telefono = +this.inputTel;
      this.objUser.usu_email = this.inputEmail;

      this.usuarioService.actualizarUsuario(this.objUser).subscribe(data => {
        if (+data === 1) {
          Swal.close();
          Swal.fire(
            'Usuario',
            'Sus datos personales han sido actualizados.',
            'success'
          );
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  // VALIDACION INGRESO NUMEROS
  validarIngreso(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
