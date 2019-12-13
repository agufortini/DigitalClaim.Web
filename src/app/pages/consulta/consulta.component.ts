import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

// ENTIDADES
import { ConsultarReclamo } from 'src/app/_entities/reclamo.entities';
import { Contacto } from '../../_entities/contacto.entities';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styles: []
})
export class ConsultaComponent implements OnInit {

  // TABLA
	displayedColumns = [
		'con_fechaAlta',
    'con_mensaje',
    'con_nombreCompleto',
		'Ver'
	];
	dataSource: MatTableDataSource<ConsultarReclamo>;
	lstReclamo: ConsultarReclamo[];
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
  dialog: any;

  constructor() { }

  ngOnInit() {

  }

  // MODAL DETALLE RECLAMO
	// verMensaje(element: Contacto) {
	// 	try {

	// 		if (element) {
	// 			this.dialog.open(ModalConsultaComponent, {
	// 				width: '50%',
	// 				data: {
	// 					obj: element
	// 				}
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

  // Filtro tabla
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}
