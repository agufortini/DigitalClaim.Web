import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

// ENTIDADES
import { ConsultarReclamo, ListarConsulta } from 'src/app/_entities/reclamo.entities';
import { Contacto } from '../../_entities/contacto.entities';

// SERVICIOS
import { ReclamoService } from '../../services/reclamo.service';

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
  dataSource: MatTableDataSource<ListarConsulta>;
  lstConsulta: ListarConsulta[];
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  dialog: any;

  constructor(private reclamoService: ReclamoService) { }

  ngOnInit() {
	try {
		this.reclamoService.listarConsulta().subscribe(data => {
			const rtdo: [] = JSON.parse(data);

			if (rtdo.length > 0) {
				this.lstConsulta = rtdo;
				this.dataSource = new MatTableDataSource<ListarConsulta>(this.lstConsulta);
				this.dataSource.paginator = this.paginator;
			}
		});
	} catch (error) {
		console.log(error);
	}
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
