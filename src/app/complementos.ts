import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
  export class Complementos {

    // VALIDACION DE INGRESO PARA CONTROLES NUMERICOS
    validarNum(event): boolean {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }

    // VALIDACION DE INGRESO PARA CONTROLES CARACTER
    // validarLetra(event): boolean {
    //   const charCode = event.which ? event.which : event.keyCode;
    //   if (charCode < 31 && (charCode < 48 || charCode > 57)) {
    //     return false;
    //   }
    //   return true;
    // }
  }
