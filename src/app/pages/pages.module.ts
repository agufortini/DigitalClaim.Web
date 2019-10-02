// MODULOS
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from './angular-material.module';
import { AgmCoreModule } from '@agm/core';

// RUTAS
import { PAGES_ROUTES } from './pages.routes';

// NG2 CHARTS
import { ChartsModule } from 'ng2-charts';

// COMPONENTES
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { GenerarReclamoComponent } from './generar-reclamo/generar-reclamo.component';
import { RegistrarReclamoComponent } from './registrar-reclamo/registrar-reclamo.component';
import { ConsultarReclamoComponent } from './consultar-reclamo/consultar-reclamo.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CrearOrdenServicioComponent } from './crear-orden-servicio/crear-orden-servicio.component';
import { RegistrarOrdenServicioComponent } from './registrar-orden-servicio/registrar-orden-servicio.component';
import { ReporteComponent } from './reporte/reporte.component';
import { GestionarOrdenServicioComponent } from './gestionar-orden-servicio/gestionar-orden-servicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ModalEstadoreclamoComponent } from './modal-estadoreclamo/modal-estadoreclamo.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { GraficoComponent } from '../components/grafico/grafico.component';
import { AreaServicioComponent } from '../pages/admin-municipal/area-servicio/area-servicio.component';
import { BarrioComponent } from '../pages/admin-municipal/barrio/barrio.component';
import { CanalComponent } from '../pages/admin-municipal/canal/canal.component';
import { CalleComponent } from '../pages/admin-municipal/calle/calle.component';
import { PrioridadComponent } from './admin-operativo/prioridad/prioridad.component';
import { ReclamoComponent } from '../pages/admin-operativo/reclamo/reclamo.component';
import { UsuarioComponent } from '../pages/admin-municipal/usuario/usuario.component';
import { CalificarReclamoComponent } from './calificar/calificar-reclamo/calificar-reclamo.component';
import { StarRatingComponent } from './calificar/star-rating/star-rating.component';
import { MatPaginatorIntl } from '@angular/material';
import { RolComponent } from '../pages/admin-municipal/rol/rol.component';

/* Dentro de la sección "exports" vamos a insertar todos los componentes que sean accesados fuera
    de este módulo en caso de ser necesario, sino se dejan solamente en "declarations"   */

@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent,
        RegistrarReclamoComponent,
        ConsultarReclamoComponent,
        ContactoComponent,
        CrearOrdenServicioComponent,
        RegistrarOrdenServicioComponent,
        GenerarReclamoComponent,
        PerfilComponent,
        ReporteComponent,
        GestionarOrdenServicioComponent,
        ModalEstadoreclamoComponent,
        AyudaComponent,
        GraficoComponent,
        CalificarReclamoComponent,
        AreaServicioComponent,
        BarrioComponent,
        CalleComponent,
        ReclamoComponent,
        UsuarioComponent,
        CanalComponent,
        StarRatingComponent,
        PrioridadComponent,
        RolComponent
    ],
    exports: [
        HomeComponent,
        CalificarReclamoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgbModule,
        AngularMaterialModule,
        PAGES_ROUTES,
        ChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDBWEJMiZxWYYYRlSXA278OpR3V-0e5ZTo',
            libraries: ['places']
        })
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [
        ModalEstadoreclamoComponent,
        CalificarReclamoComponent
    ],
    bootstrap: [CalificarReclamoComponent],
})
export class PagesModule { }
