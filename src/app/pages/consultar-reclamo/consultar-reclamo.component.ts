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

	// VARIABLES NGMODEL PARA CONTROLES ANGULAR MATERIAL
	inputCodRec = '';
	inputDNI = '';
	inputCodigo = '';
	ddlArServ = '';
	TipoReclamoID: number;
	ddlEstRec = '';
	ddlPri = '';
	ddlBar = '';

	// OBJETO PARA PASAR COMO PARAMETRO A SERVICIO
	objIDUser: any;
	objIDArServ: any;
	objIDRec: any;

	// CARGA DDLS
	arrArServ: any;
	arrTipRec: any;
	arrEstado: any;
	arrPrioridad: any;
	arrBarrio: any;
	boCarga = true;
	estadoReclamo: number;

	// AREA SERVICIO SELECCIONADO
	arServ: any;
	tipoReclamo: any;
	Estado: any;
	Prioridad: any;
	Barrio: any;

	// Filtros Vista
	FechaDesde: any;
	FechaHasta: any;
	filtroFecha: string;
	filtroDNI: string;
	filtroCodigo: string;
	filtroAreaServicio: string;
	filtroBarrio: string;

	fechaHoy: Date;
	objFiltro: any;

	ttpFiltro = 'Más filtros';

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

	maxDate = new Date();

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
				// Controles de Formulario
				this.frmControls();

				// this.setFechaHasta();

				// Carga de select Estado de Reclamo
				this.ddlService.selectEntitie('ReclamoController', 'SelectEstadoReclamo').subscribe((data) => {
					this.arrEstado = JSON.parse(data);
					this.frmConsultar.estado.patchValue(this.arrEstado[0].estRec_IDEstado);
				});

				/* Se asigna valor predeterminado a select, estado "Sin Asignar" y se llama al méotodo para buscar los reclamos
				/ en ese estado */
				this.frmConsultar.estado.patchValue(1);
				this.listarReclamoPorEstado();
				document.getElementById('idTableConsulta').style.visibility = 'visible';
			} else {
				// Controles de Formulario
				this.frmControls();
				// Carga de selects del formulario
				this.cargarDDL();
			}
		} catch (error) {
			console.log(error);
		}
	}

	frmControls() {
		this.frmConsultarReclamo = this.formBuilder.group({
			fechaDesde: [''],
			fechaHasta: [''],
			codigo: [ ''],
			dni: [''],
			areaServicio: [''],
			tipoReclamo: [''],
			estado: [''],
			barrio: ['']
		});
	}

	// setFechaHasta() {
	// 	this.fechaHoy = new Date();
	// 	this.fechaHoy = this.datePipe.transform(this.fechaHoy, 'dd/MM/yyyy');
	// 	return this.frmConsultar.fechaHasta.patchValue(this.fechaHoy);
	// }

	// OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
	get frmConsultar() {
		return this.frmConsultarReclamo.controls;
	}

	listarReclamoPorEstado() {
		const estRec_IDEstado: any = this.frmConsultar.estado.value;

		this.objIDRec = {
			stFiltro: 'usu_ID = ' + this.user.usu_IDUsuario + ' and rec_IDEstado = ' + estRec_IDEstado
		};

		this.selectV_Reclamo(this.objIDRec);
	}

	selectV_Reclamo(objIDUser: any) {
		this.reclamoService.selectReclamo(objIDUser).subscribe((data) => {
			this.lstReclamo = JSON.parse(data);

			if (this.lstReclamo.length > 0) {
				this.dataSource = new MatTableDataSource<ConsultarReclamo>(this.lstReclamo);
				this.dataSource.paginator = this.paginator;
			} else {
				Swal.fire({
					allowOutsideClick: false,
					type: 'warning',
					title: 'Consultar Reclamo',
					text: 'Actualmente, no hay reclamos en Estado ' + this.arrEstado[this.frmConsultar.estado.value].estRec_nombre
				});
			}
		});
	}

	selectReclamo() {
		try {
			const fechaDesde = this.frmConsultar.fechaDesde.value;
			const fechaHasta = this.frmConsultar.fechaHasta.value;
			const dni = this.frmConsultar.dni.value;
			const codigo = this.frmConsultar.codigo.value;
			const areaServicio = this.frmConsultar.areaServicio.value;
			const barrio = this.frmConsultar.barrio.value;

			// Validación si se ingresó por algún campo de fecha
			if (fechaDesde !== '' || fechaHasta !== '') {
				// Validación por ingreso de ambas fechas
				if (fechaDesde !== '' && fechaHasta !== '') {
	
					// Valida si Fecha Desde es menor a Fecha Hasta
					if (fechaDesde <= fechaHasta) {
						this.filtroFecha = `rec_fechaAlta >= ${fechaDesde} and rec_fechaAlta <= ${fechaHasta}`;						
					} else {
						// Muestra error en rango de Fechas
						Swal.fire({
							allowOutsideClick: false,
							type: 'error',
							title: 'Consultar Reclamo',
							text: 'La fecha Desde debe ser menor a la fecha Hasta'
						});
					}
				// Validación por ingreso de fechas individuales
				} else if (fechaDesde !== '') {
					this.filtroFecha = `rec_fechaAlta >= ${fechaDesde}`;
				} else if (fechaHasta !== '') {
					this.filtroFecha = `rec_fechaAlta <= ${fechaHasta}`;
				}

				this.objFiltro = {
					stFiltro: this.filtroFecha
				};
			}

			// Si control DNI es distinto de "" asigno valor a filtroDNI
			if (dni !== '') {
				if (this.objFiltro !== '') {
					this.objFiltro = {
						
					};
				}
				this.filtroDNI = `usu_DNI = ${dni}`;

				// this.objFiltro = {
				// 	stFiltro: this.stFiltro
				// };
			}

			// // Si control codigo es distinto de "" asigno valor a filtroCodigo
			// if (codigo !== '') {
			// 	this.filtroCodigo = `rec_codigo = ${codigo}`;
			// 	if (this.stFiltro !== '') {
			// 		this.stFiltro += ' and ' + this.filtroCodigo;
			// 	} else {
			// 		this.stFiltro = this.filtroCodigo;
			// 	}

			// 	// this.objFiltro = {
			// 	// 	stFiltro: this.stFiltro
			// 	// };
			// }

			// // Si control areaServicio es distinto de "" asigno valor a filtroAreaServicio
			// if (areaServicio !== '') {
			// 	this.filtroAreaServicio = `arServ_ID = ${areaServicio}`;
			// 	if (this.stFiltro !== '') {
			// 		this.stFiltro += ' and ' + this.filtroAreaServicio;
			// 	} else {
			// 		this.stFiltro = this.filtroAreaServicio;
			// 	}

			// 	// this.objFiltro = {
			// 	// 	stFiltro: this.stFiltro
			// 	// };
			// }

			// // Si control areaServicio es distinto de "" asigno valor a filtroAreaServicio
			// if (barrio !== '') {
			// 	this.filtroBarrio = `bar_ID = ${barrio}`;
			// 	if (this.stFiltro !== '') {
			// 		this.stFiltro += ' and ' + this.filtroBarrio;
			// 	} else {
			// 		this.stFiltro = this.filtroBarrio;
			// 	}		
			// }

			// this.objFiltro = {
			// 	stFiltro: this.stFiltro
			// };

			console.log(this.objFiltro);

			// this.reclamoService.selectReclamo(this.objFiltro).subscribe(data => {
			//   if (data) {
			//     this.lstReclamo = JSON.parse(data);
			//     this.dataSource = new MatTableDataSource<ConsultarReclamo>(this.lstReclamo);
			//     this.dataSource.paginator = this.paginator;
			//     document.getElementById('idTableConsulta').style.visibility = 'visible';
			//   } else {
			//     Swal.fire({
			//       allowOutsideClick: false,
			//       type: 'warning',
			//       title: 'Consultar reclamo',
			//       text: 'No se encontraron reclamos con el filtro aplicado'
			//     });
			//     this.frmConsultarReclamo.reset();
			//   }
			// });

			this.objFiltro = '';

		} catch (error) {
			console.log(error);
		}
	}

	cargarDDL() {
		this.ddlService.selectEntitie('AreaServicioController', 'SelectAreaServicio').subscribe((data) => {
			this.arrArServ = JSON.parse(data);
		});

		this.ddlService.selectEntitie('BarrioController', 'SelectBarrio').subscribe((data) => {
			this.arrBarrio = JSON.parse(data);
		});
	}

	cargarDDLTipoReclamo() {
		try {
			this.objIDArServ = {
				tipRec_IDArServ: this.frmConsultar.areaServicio.value
			};

			this.ddlService.selectTipoReclamo(this.objIDArServ).subscribe((data) => {
				this.arrTipRec = JSON.parse(data);
				this.arServ = this.arrArServ.filter((x) => x.arServ_IDAreaServicio === +this.frmConsultar.areaServicio.value)[0];
			});
		} catch (error) {
			console.log(error);
		}
	}

	// FILTRO TABLA
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


	selectTipoReclamo() {
		this.tipoReclamo = this.arrTipRec.filter((x) => x.tipRec_IDTipoReclamo === +this.TipoReclamoID)[0];
	}
}
