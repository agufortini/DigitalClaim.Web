import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Entidades
import { Usuario } from 'src/app/_entities/usuario.entities';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-generar-reclamo-datos-ciudadano',
  templateUrl: './generar-reclamo-datos-ciudadano.component.html',
  styleUrls: ['./generar-reclamo-datos-ciudadano.component.css']
})
export class GenerarReclamoDatosCiudadanoComponent implements OnInit {
  frmDatosCiudadano: FormGroup;
  objUsuario: Usuario;
  objValidar: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService) {
    this.objUsuario = JSON.parse(localStorage.getItem('objUsuario'));
  }


  ngOnInit() {
    try {
        this.frmDatosCiudadano = this.formBuilder.group({
          dni: ['', Validators.required],
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          telefono: ['', Validators.required],
          email: ['', Validators.required]
        });

        // Se llama al método para asignar los datos del ciudadano a los controles, en caso de necesitar modificar
        this.modificarDatosCiudadano();
    } catch (error) {
      console.log(error);
    }

  }

  // Obtención de los controles del formulario
  get frmCiudadano() {
    return this.frmDatosCiudadano.controls;
  }

  // Metodo que reasigna los valores del objeto reclamo a sus controles correspondientes
  modificarDatosCiudadano() {
    if (this.objUsuario !== null) {
      // Asignación de valores a controles para poder modificar los datos del Reclamo
      this.frmDatosCiudadano.setValue({
        dni: this.objUsuario.usu_dni,
        nombre: this.objUsuario.usu_nombre,
        apellido: this.objUsuario.usu_apellido,
        telefono: this.objUsuario.usu_telefono,
        email: this.objUsuario.usu_email
      });
    }
  }

  validarUsuario() {
    try {
      this.objValidar = {
        usu_dni: this.frmCiudadano.dni.value
      };

      // Se valida que el usuario ciudadano a realizar el reclamo no se encuentre registrado
      this.usuarioService.validarUsuario(this.objValidar).subscribe(data => {
        const rtdo = JSON.parse(data);
        
        if (rtdo === null) {
          /* Si no existe, se procede a realizar la carga de datos del objeto y se transfieren al "generar-reclamo-municipal" 
          donde se procede a la carga del reclamo */
          this.objUsuario = new Usuario();
          this.objUsuario.usu_username = this.frmCiudadano.dni.value;
          this.objUsuario.usu_password = this.frmCiudadano.dni.value;
          this.objUsuario.usu_dni = this.frmCiudadano.dni.value;
          this.objUsuario.usu_nombre = this.frmCiudadano.nombre.value;
          this.objUsuario.usu_apellido = this.frmCiudadano.apellido.value;
          this.objUsuario.usu_telefono = this.frmCiudadano.telefono.value;
          this.objUsuario.usu_email = this.frmCiudadano.email.value;

          localStorage.setItem('objUsuario', JSON.stringify(this.objUsuario));
          this.router.navigateByUrl('/generar-reclamo-municipal');
        } else {
          Swal.fire({
            allowOutsideClick: false,
            type: 'warning',
            title: 'Datos del Ciudadano',
            text: 'El usuario ya se encuentra registrado.'
          }).then(result => {
            this.frmDatosCiudadano.reset();
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Validación para controles numéricos
  validarIngreso(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
