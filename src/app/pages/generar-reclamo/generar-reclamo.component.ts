import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

// GOOGLE MAPS
import { MapsAPILoader } from '@agm/core';

// SERVICIOS
import { SelectService } from '../../services/select-service.service';
import { ReclamoService } from '../../services/reclamo.service';

// ENTIDADES
import { ValidarReclamo } from '../../_entities/reclamo.entities';
import { Usuario } from '../../_entities/usuario.entities';
import { Canal } from '../../_entities/canal.entities';

@Component({
  selector: 'app-generar-reclamo',
  templateUrl: './generar-reclamo.component.html',
  styleUrls: ['./generar-reclamo.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class GenerarReclamoComponent implements OnInit {
  frmGenerarReclamo: FormGroup;
  user: Usuario;
  objValidarRec: ValidarReclamo;
  objRec: any = {};

  // PROPIEDADES UTILIZADAS PARA CORROBORAR QUE EL USUARIO NO REGISTRE MAS DE 1 RECLAMO POR DIA
  fechaRealizacion: any;
  objIDUser: any;
  fechaHoy: any;

  // CARGA DDLS
  arrArServ: any;
  arrTipRec: any;
  arrBarrio: any;
  arrCalle: any;
  arrCanal: any;
  lstCanal: any[] = [];
  arrOpcion = [
    { stOpcion: 'visible', opcion: 'Si' },
    { stOpcion: 'hidden', opcion: 'No' },
  ];

  // PROPIEDADES PARA LOS FILTROS
  arServ: any;
  tipoReclamo: any;
  TipoReclamoID: number;
  Calle: any;
  CalleID: number;
  Barrio: any;
  Canal: any;
  CanalID: number;
  altura: any;
  observacion: string;

  // OBJETOS PARA CARGAR DDLS
  objIDArServ: any = {};
  objIDBarrio: any = {};

  // MOSTRAR Y OCULTAR MAPA
  mapVisibility = 'hidden';

  // GOOGLE MAP
  inputMap: string;
  lat: number;
  lng: number;
  zoom: number;
  private geoCoder;
  @ViewChild('agmSearch', {static: false}) public searchElementRef: ElementRef;
  objCalle: any;

  constructor(private ddlService: SelectService,
              private reclamoService: ReclamoService,
              private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    try {
      if (this.user.usu_IDRol === 1) {
        this.frmGenerarReclamo = this.formBuilder.group({
          areaServicio: ['', Validators.required],
          tipoReclamo: ['', Validators.required],
          ubicacion: ['', Validators.required],
          barrio: ['', Validators.required],
          calle: ['', Validators.required],
          altura: ['', Validators.required],
          canal: [''],
          observaciones: ['']
        });

        // this.validarRealizacionReclamo();
      } else if (this.user.usu_IDRol === 2 || this.user.usu_IDRol === 5) {
        this.frmGenerarReclamo = this.formBuilder.group({
          areaServicio: ['', Validators.required],
          tipoReclamo: ['', Validators.required],
          ubicacion: ['', Validators.required],
          barrio: ['', Validators.required],
          calle: ['', Validators.required],
          altura: ['', Validators.required],
          canal: ['', Validators.required],
          observaciones: ['']
        });
      }

      this.cargaDDL();
    } catch (error) {
      console.log(error);
    }
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmGenerarReclamo.controls;
  }

  cargaDDL() {
    this.ddlService.selectEntitie('AreaServicioController', 'SelectAreaServicio').subscribe(data => {
      this.arrArServ = JSON.parse(data);
    });

    this.ddlService.selectEntitie('BarrioController', 'SelectBarrio').subscribe(data => {
      this.arrBarrio = JSON.parse(data);
    });

    if (this.user.usu_IDRol === 2 || this.user.usu_IDRol === 5) {
      this.ddlService.selectEntitie('CanalController', 'SelectCanal').subscribe(data => {
        this.arrCanal = JSON.parse(data);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.arrCanal.length; i++) {
          const IDCanal: number = this.arrCanal[i].can_IDCanal;

          if (IDCanal <= 2) {
            this.lstCanal.push(this.arrCanal[i]);
          } else {
            return;
          }
        }
      });
    }
  }

  //#region GOOGLE MAPS

  getPlacesAutocomplete() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    // tslint:disable-next-line:new-parens
    this.geoCoder = new google.maps.Geocoder;

    // tslint:disable-next-line:prefer-const
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ['address']
    });
    autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
        // get the place result
        // tslint:disable-next-line:prefer-const
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        // set latitude, longitude and zoom
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        // this.zoom = 12;
      });
     });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.lat, this.lng);
      });
    }
  }

  markerDragEnd($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }

  getAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder();
    // tslint:disable-next-line:object-literal-key-quotes
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {

          // Con el nombre de la calle, se buscan todos los barrios de esa calle
          this.objCalle = {
            cal_nombre: results[0].address_components[1].long_name
          };

          this.reclamoService.selectBarrioPorCalle(this.objCalle).subscribe(dataBarrio => {
            this.arrBarrio = JSON.parse(dataBarrio);

            this.reclamoService.selectCalle(this.objCalle).subscribe(dataCalle => {
              this.arrCalle = JSON.parse(dataCalle);
              this.altura = results[0].address_components[0].long_name;
            });

          });
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  //#endregion

  validarRealizacionReclamo() {
      if (this.user.usu_IDRol === 1) {
        this.objIDUser = {
          usu_IDUsuario: this.user.usu_IDUsuario
        };

        this.reclamoService.validarRealizacionReclamo(this.objIDUser).subscribe(data => {
          const rtdo = JSON.parse(data);
          this.fechaHoy = new Date();
          this.fechaHoy = this.datePipe.transform(this.fechaHoy, 'dd/MM/yyyy');

          if (rtdo.rec_fechaAlta === this.fechaHoy) {
            Swal.fire({
              allowOutsideClick: false,
              type: 'warning',
              title: 'Registrar reclamo',
              text: 'No puede realizar la operación nuevamente ya que sólo se puede enviar un reclamo por día.'
            }).then(result => {
              if (result.value) {
                this.router.navigateByUrl('/home');
              }
            });
          }
        }
      );
    }
  }

  validarReclamo() {
    try {
      this.objValidarRec = new ValidarReclamo();
      this.objValidarRec.rec_altura = this.f.altura.value;
      this.objValidarRec.rec_IDCalle = this.f.calle.value;
      this.objValidarRec.rec_IDBarrio = this.f.barrio.value;
      this.objValidarRec.rec_IDTipoReclamo = this.f.tipoReclamo.value;

      this.reclamoService.validarReclamo(this.objValidarRec).subscribe(data => {
        const obj = JSON.parse(data);

        if (obj !== null) {
            Swal.fire({
              allowOutsideClick: false,
              type: 'warning',
              title: 'Reclamo existente',
              text: 'El reclamo que intenta ingresar, ya se encuentra registrado. El estado del mismo es: ' + obj.rec_estado.toUpperCase()
            }).then(result => {
                if (result.value) {
                  this.frmGenerarReclamo.reset();
                }
              });
          } else {
              this.objRec = {
                areaServicio: this.arServ,
                tipoReclamo: this.tipoReclamo,
                barrio: this.Barrio,
                calle: this.Calle,
                altura: this.f.altura.value,
                canal: this.Canal,
                observaciones: this.observacion
              };
              localStorage.setItem('datosReclamo', JSON.stringify(this.objRec));
              this.router.navigateByUrl('/registrar-reclamo');
          }
      });
    } catch (error) {
      console.log(error);
    }
  }

  ubicacionMapa() {
    if (this.mapVisibility === 'hidden') {
      this.cargaDDL();
      this.resetSelects();

    } else {
      this.getPlacesAutocomplete();
      this.resetSelects();
    }
  }

  resetSelects() {
    this.f.barrio.setValue('');
    this.f.calle.setValue('');
    this.altura = null;
  }

  //#endregion FILTROS SELECTS
  cargaSelectTipoReclamo() {
    try {
      this.objIDArServ = {
        tipRec_IDArServ: this.f.areaServicio.value
      };

      this.ddlService.selectTipoReclamo(this.objIDArServ).subscribe(data => {
        this.arrTipRec = JSON.parse(data);
        this.arServ = this.arrArServ.filter(x => x.arServ_IDAreaServicio === +this.f.areaServicio.value)[0];
      });

      this.f.tipoReclamo.setValue('');
    } catch (error) {
      console.log(error);
    }
  }

  cargaSelectCalle() {
    try {
      if (this.mapVisibility === 'hidden') {
        this.objIDBarrio = {
          bar_IDBarrio: this.f.barrio.value
        };

        this.ddlService.selectCalle(this.objIDBarrio).subscribe(data => {
          this.arrCalle = JSON.parse(data);
          this.Barrio = this.arrBarrio.filter(x => x.bar_IDBarrio === +this.f.barrio.value)[0];
        });

        this.f.calle.setValue('');
      } else {
        this.Barrio = this.arrBarrio.filter(x => x.bar_IDBarrio === +this.f.barrio.value)[0];
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectTipoReclamo() {
    this.tipoReclamo = this.arrTipRec.filter(x => x.tipRec_IDTipoReclamo === +this.TipoReclamoID)[0];
  }

  selectCalle() {
    if (document.getElementById('googleMap').style.visibility === 'hidden') {
      this.Calle = this.arrCalle.filter(x => x.cal_IDCalle === +this.CalleID)[0];
    } else {
      this.Calle = this.arrCalle.filter(x => x.cal_IDCalle === +this.f.calle.value)[0];
    }
  }

  selectCanal() {
    this.Canal = this.arrCanal.filter(x => x.can_IDCanal === +this.CanalID)[0];
  }
  //#endregion

  // VALIDACION CONTROL ALTURA
  validarIngreso(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
