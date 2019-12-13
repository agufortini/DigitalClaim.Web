import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

// CONTROLES
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalEstadoreclamoComponent } from '../modal-estadoreclamo/modal-estadoreclamo.component';

// SERVICIOS
import { SelectService } from 'src/app/services/select-service.service';
import { ReclamoService } from '../../services/reclamo.service';

// ENTIDADES
import { ConsultarReclamo, ReclamoC } from '../../_entities/reclamo.entities';
import { Usuario } from '../../_entities/usuario.entities';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-consultar-reclamo',
	templateUrl: './consultar-reclamo.component.html',
	styleUrls: [ './consultar-reclamo.component.css' ],
	providers: [ DatePipe ]
})
export class ConsultarReclamoComponent implements OnInit {
	frmConsultarReclamo: FormGroup;
	user: Usuario;
	objFiltro: any;

	// TABLA
	displayedColumns = [
		'rec_codigo',
		'rec_fechaAlta',
		'arServ_nombre',
		'tipRec_nombre',
		'rec_direccion',
		'bar_nombre',
		'Ver'
	];
	dataSource: MatTableDataSource<ConsultarReclamo>;
	lstReclamo: ConsultarReclamo[];
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	constructor(
		private reclamoService: ReclamoService,
		private formBuilder: FormBuilder,
		private ddlService: SelectService,
		private dialog: MatDialog,
		private datePipe: DatePipe
	) {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
	}

	ngOnInit() {
		try {
			if (this.user.usu_IDRol === 1) {
				this.frmConsultarReclamo = this.formBuilder.group({
					dato: [''],
				});

				this.objFiltro = {
					stFiltro: `usu_ID = ${this.user.usu_IDUsuario}`
				};

				this.selectReclamo();
			} else {
				this.frmConsultarReclamo = this.formBuilder.group({
					dni: ['', Validators.required],
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	// OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
	get frmConsultar() {
		return this.frmConsultarReclamo.controls;
	}

	consultarReclamo() {
		try {
			// Se pregunta por el IDRol del Usuario.
			// Búsqueda de reclamos por Usuario Municipal utilizando DNI de Ciudadano.
			const dni = this.frmConsultar.dni.value;
	
			if (dni !== '') {
				this.objFiltro = {
					stFiltro: `usu_DNI = ${dni}`
				};
			}

			this.selectReclamo();

		} catch (error) {
			console.log(error);
		}
	}

	selectReclamo() {
		try {
			// Se realiza la búsqueda de los reclamos de acuerdo a los filtros aplicados
			this.reclamoService.selectReclamo(this.objFiltro).subscribe((data) => {
				this.lstReclamo = JSON.parse(data);
				
				// Si la lista tiene datos, los muestra en una tabla
				if (this.lstReclamo.length > 0) {
					this.dataSource = new MatTableDataSource<ConsultarReclamo>(this.lstReclamo);
					this.dataSource.paginator = this.paginator;
					document.getElementById('idTableConsulta').style.visibility = 'visible';
				} else {
					// Sino, pregunta por un usuario u otro para mostrar el tipo de error correspondiente
					if (this.user.usu_IDRol === 1) {
						// Swal.fire({
						// 	allowOutsideClick: false,
						// 	type: 'warning',
						// 	title: 'Consultar Reclamo',
						// 	text: 'Actualmente, no hay reclamos en Estado ' + this.arrEstado[this.frmConsultar.estado.value - 1].estRec_nombre
						// });	
					} else {
						Swal.fire({
							allowOutsideClick: false,
							type: 'warning',
							title: 'Consultar reclamo',
							text: 'No se encontraron reclamos con el DNI ingresado'
						});
						this.frmConsultarReclamo.reset();
						this.lstReclamo = null;
						document.getElementById('idTableConsulta').style.visibility = 'hidden';
						document.getElementById('txtDNI').focus();
					}
				}
			});

			console.log(this.objFiltro);
			// Se vacía el filtro para poder aplicar una búsqueda nuevamente si fuese necesario
			this.objFiltro = '';

		} catch (error) {
			console.log(error);	
		}
	}

	// Filtro tabla
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
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

	// MODAL DETALLE RECLAMO
	verEstados(element: ReclamoC) {
		try {
			// Guardo el IDReclamo en el localStorage para despues poder hacer el rating del reclamo
			localStorage.setItem('rec_IDReclamo', JSON.stringify(element.rec_ID));

			if (element) {
				this.dialog.open(ModalEstadoreclamoComponent, {
					width: '50%',
					data: {
						obj: element
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}