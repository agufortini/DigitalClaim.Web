import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReclamoService } from '../../services/reclamo.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RatingReclamoComponent } from '../rating/rating-reclamo/rating-reclamo.component';

@Component({
  selector: 'app-modal-estadoreclamo',
  templateUrl: './modal-estadoreclamo.component.html',
  styleUrls: ['./modal-estadoreclamo.component.css']
})
export class ModalEstadoreclamoComponent implements OnInit {
  displayedColumns: string[] = [
    'his_fechaIngreso',
    'his_horaIngreso',
    'his_observaciones',
    'estRec_nombre'
  ];

  codRec: number;
  lstDatos: any;
  dataSource: MatTableDataSource<any>;
  objCodRec: any;

  constructor(private dialogRef: MatDialogRef<ModalEstadoreclamoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private reclamoService: ReclamoService,
              private dialog: MatDialog,
              private router: Router) {
    this.codRec = this.data.obj.rec_codigo;
  }

  ngOnInit() {
    try {
      this.selectHistorial();
    } catch (error) {
      console.log(error);
    }
  }

  selectHistorial() {
    this.objCodRec = {
      stCodRec: this.codRec
    };

    this.reclamoService.selectHistorial(this.objCodRec).subscribe(data => {
      this.lstDatos = JSON.parse(data);
      this.dataSource = new MatTableDataSource<any>(this.lstDatos);
    });
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  calificarReclamo() {
    try {
      this.dialog.open(RatingReclamoComponent, {
        width: '50%'
      });
    } catch (error) {
      console.log(error);
    }
  }
}
