import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// ENTIDADES
import { ListarConsulta } from 'src/app/_entities/reclamo.entities';
import { Contacto } from '../../_entities/contacto.entities';
import { IListarConsulta } from '../../_entities/reclamo.entities';

// SERVICIOS
import { ReclamoService } from '../../services/reclamo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styles: []
})
export class ConsultaComponent implements OnInit {
   frmConsulta: FormGroup;
   mensaje: string;

  // TABLA
  displayedColumns = [
	'con_fechaAlta',
	'usu_nombreCompleto',
	'Ver'
  ];
  dataSource: MatTableDataSource<IListarConsulta>;
  lstConsulta: ListarConsulta[];
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  dialog: any;

  constructor(private reclamoService: ReclamoService,
			  private router: Router,
			  private formBuilder: FormBuilder) { }

  ngOnInit() {
	try {
		this.frmConsulta = this.formBuilder.group({
			mensaje: ['', Validators.required],
			respuesta: ['', Validators.required]
		});

		this.listarConsulta();
	} catch (error) {
		console.log(error);
	}
  }

  listarConsulta() {
	this.reclamoService.listarConsulta().subscribe(data => {
		this.lstConsulta = JSON.parse(data);

		if (this.lstConsulta !== null) {
			this.dataSource = new MatTableDataSource<IListarConsulta>(this.lstConsulta);
			this.dataSource.paginator = this.paginator;
		} else {
			Swal.fire({
				allowOutsideClick: false,
				type: 'warning',
				title: 'Consultas',
				text: 'No hay consultas pendientes de responder.'
			 }).then(result => {
				this.router.navigateByUrl('/generar-reclamo-ciudadano');
			});
		}
	});
  }

  // MODAL DETALLE RECLAMO
	verMensaje(element: Contacto) {
		try {

			// if (element) {
			// 	this.dialog.open(ModalConsultaComponent, {
			// 		width: '50%',
			// 		data: {
			// 			obj: element
			// 		}
			// 	});
			// }
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

}
