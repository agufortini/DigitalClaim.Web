import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';
import { Complementos } from '../../../complementos';

// ENTIDADES
import { Usuario, IUsuario } from '../../../_entities/usuario.entities';

// SERVICIOS
import { SelectService } from '../../../services/select-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  frmRegistrarUsuario: FormGroup;
  user: Usuario;
  objUser: Usuario;
  boBand = true;
  IDUsuario: number;
  IDRol: number;
  objIDUser: any;

  // NG MODEL
  inputDNI: number;
  inputUser: string;
  inputPass: string;
  inputNombre: string;
  inputApellido: string;
  inputTel: number = null;
  inputEmail: string;

  // TABLA
  displayedColumns = [
    'usu_dni',
    'usu_nombreCompleto',
    'Editar'
  ];
  dataSource: MatTableDataSource<IUsuario>;
  lstUsuario: IUsuario[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private loginService: UsuarioService,
              private complemento: Complementos,
              private selectService: SelectService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.frmRegistrarUsuario = this.formBuilder.group({
      dni: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      email: ['']
    });

    if (this.user.usu_IDRol === 5) {
      this.selectUsuarioMunicipal();
    } else {
      this.selectUsuarioOperativo();
    }
  }

  selectUsuarioMunicipal() {
    this.selectService.selectUsuarioMunicipal().subscribe(data => {
      this.lstUsuario = JSON.parse(data);
      this.dataSource = new MatTableDataSource<IUsuario>(this.lstUsuario);
      this.dataSource.paginator = this.paginator;
    });
  }

  selectUsuarioOperativo() {
    this.selectService.selectUsuarioOperativo().subscribe(data => {
      this.lstUsuario = JSON.parse(data);
      this.dataSource = new MatTableDataSource<IUsuario>(this.lstUsuario);
      this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmRegistrarUsuario.controls;
  }

  registrarUsuario(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objUser = new Usuario();
      this.objUser.usu_IDUsuario = (boBand) ? 0 : this.IDUsuario;
      this.objUser.usu_username = this.inputUser;
      this.objUser.usu_password = this.inputPass;
      this.objUser.usu_dni = this.inputDNI;
      this.objUser.usu_nombre = this.inputNombre;
      this.objUser.usu_apellido = this.inputApellido;
      this.objUser.usu_telefono = this.inputTel;
      this.objUser.usu_email = this.inputEmail;
      this.objUser.usu_IDRol = this.IDRol;

      if (boBand) {
        this.loginService.registrarUsuario(this.objUser).subscribe(data => {
            const rtdo = JSON.parse(data);

            if (rtdo !== 'Usuario existente') {
              Swal.close();
              Swal.fire({
                allowOutsideClick: false,
                type: 'success',
                text: 'Usuario ' + this.objUser.usu_username + ' creado con éxito!'
              });

              this.resetForm();
              if (this.user.usu_IDRol === 5) {
                this.selectUsuarioMunicipal();
              } else {
                this.selectUsuarioOperativo();
              }
            } else {
              Swal.close();
              Swal.fire({
                allowOutsideClick: false,
                type: 'warning',
                text: 'El usuario ' + this.objUser.usu_nombre + ' ' + this.objUser.usu_apellido + ' ya existe.'
              });

              this.resetForm();
            }
          });
      } else {
        this.loginService.actualizarUsuario(this.objUser).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire({
              allowOutsideClick: false,
                type: 'success',
                text: 'Los datos del Usuario ' + this.objUser.usu_nombre + ' ' + this.objUser.usu_apellido + ' se actualizaron correctamente.'
            });

            this.resetForm();
            if (this.user.usu_IDRol === 5) {
              this.selectUsuarioMunicipal();
            } else {
              this.selectUsuarioOperativo();
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectDataUsuario(IDUsuario: number, userDNI: number, IDRol: number) {
    this.boBand = false;
    // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS
    this.IDUsuario = IDUsuario;
    this.IDRol = IDRol;

    this.objIDUser = {
      usu_IDUsuario: IDUsuario
    };

    this.loginService.selectDataUsuario(this.objIDUser).subscribe(data => {
      const dataUser: Usuario = JSON.parse(data);

      this.inputDNI = userDNI;
      this.inputUser = dataUser.usu_username;
      this.inputPass = dataUser.usu_password;
      this.inputNombre = dataUser.usu_nombre;
      this.inputApellido = dataUser.usu_apellido;
      this.inputTel = dataUser.usu_telefono;
      this.inputEmail = dataUser.usu_email;
    });
  }

  resetForm() {
    this.frmRegistrarUsuario.reset();
    this.boBand = true;
    document.getElementById('inputDNI').focus();
  }

  // FILTRO TABLA
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  validarNum(event) {
    return this.complemento.validarNum(event);
  }
}
