// MODULOS
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from './angular-material.module';
import { AgmCoreModule } from '@agm/core';
import { MatExpansionModule } from '@angular/material';

// RUTAS
import { PAGES_ROUTES } from './pages.routes';

// NG2 CHARTS
import { ChartsModule } from 'ng2-charts';

// COMPONENTES
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { GenerarReclamoCiudadanoComponent } from '../pages/generar-reclamo/generar-reclamo-ciudadano/generar-reclamo-ciudadano.component';
import { GenerarReclamoMunicipalComponent } from '../pages/generar-reclamo/generar-reclamo-municipal/generar-reclamo-municipal.component';
import { RegistrarReclamoComponent } from './registrar-reclamo/registrar-reclamo.component';
import { ConsultarReclamoComponent } from './consultar-reclamo/consultar-reclamo.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CrearOrdenServicioComponent } from './crear-orden-servicio/crear-orden-servicio.component';
import { RegistrarOrdenServicioComponent } from './registrar-orden-servicio/registrar-orden-servicio.component';
import { ReporteComponent } from './reporte/reporte.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ModalEstadoreclamoComponent } from './modal-estadoreclamo/modal-estadoreclamo.component';
import { GraficoComponent } from '../components/grafico/grafico.component';
import { AreaServicioComponent } from '../pages/admin-municipal/area-servicio/area-servicio.component';
import { BarrioComponent } from '../pages/admin-municipal/barrio/barrio.component';
import { CanalComponent } from '../pages/admin-municipal/canal/canal.component';
import { CalleComponent } from '../pages/admin-municipal/calle/calle.component';
import { PrioridadComponent } from './admin-operativo/prioridad/prioridad.component';
import { ReclamoComponent } from '../pages/admin-operativo/reclamo/reclamo.component';
import { UsuarioComponent } from '../pages/admin-municipal/usuario/usuario.component';
import { RatingReclamoComponent } from './rating/rating-reclamo/rating-reclamo.component';
import { StarRatingComponent } from './rating/star-rating/star-rating.component';
import { RolComponent } from '../pages/admin-municipal/rol/rol.component';
import { EstadoOrdenServicioComponent } from '../pages/admin-municipal/estado/estado-orden-servicio/estado-orden-servicio.component';
import { EstadoReclamoComponent } from '../pages/admin-municipal/estado/estado-reclamo/estado-reclamo.component';
import { PersonalComponent } from '../pages/admin-operativo/personal/personal.component';
import { AyudaRegistrarReclamoComponent } from './ayuda/Reclamante/ayuda-registrar-reclamo/ayuda-registrar-reclamo.component';
import { AyudaConsultarReclamoComponent } from './ayuda/Reclamante/ayuda-consultar-reclamo/ayuda-consultar-reclamo.component';
import { AyudaCalificarReclamoComponent } from './ayuda/Reclamante/ayuda-calificar-reclamo/ayuda-calificar-reclamo.component';
import { AyudaRegistrarReclamoMunicipalComponent } from '../pages/ayuda/Municipal/ayuda-registrar-reclamo-municipal/ayuda-registrar-reclamo-municipal.component';
import { AyudaConsultarReclamoMunicipalComponent } from '../pages/ayuda/Municipal/ayuda-consultar-reclamo-municipal/ayuda-consultar-reclamo-municipal.component';
import { AyudaReportesMunicipalComponent } from './ayuda/Municipal/ayuda-reportes-municipal/ayuda-reportes-municipal.component';
import { AyudaDominioMunicipalComponent } from './ayuda/Municipal/ayuda-dominio-municipal/ayuda-dominio-municipal.component';
import { ConsultaComponent } from '../pages/consulta/consulta.component';
import { ModalRatingComponent } from './modal-rating/modal-rating.component';

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
        GenerarReclamoCiudadanoComponent,
        PerfilComponent,
        ReporteComponent,
        ModalEstadoreclamoComponent,
        GraficoComponent,
        RatingReclamoComponent,
        AreaServicioComponent,
        BarrioComponent,
        CalleComponent,
        ReclamoComponent,
        UsuarioComponent,
        CanalComponent,
        StarRatingComponent,
        PrioridadComponent,
        RolComponent,
        EstadoOrdenServicioComponent,
        EstadoReclamoComponent,
        PersonalComponent,
        AyudaRegistrarReclamoComponent,
        AyudaConsultarReclamoComponent,
        AyudaCalificarReclamoComponent,
        GenerarReclamoMunicipalComponent,
        AyudaRegistrarReclamoMunicipalComponent,
        AyudaConsultarReclamoMunicipalComponent,
        AyudaReportesMunicipalComponent,
        AyudaDominioMunicipalComponent,
        ConsultaComponent,
        ModalRatingComponent
    ],
    exports: [
        HomeComponent,
        RatingReclamoComponent
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
        MatExpansionModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [
        ModalEstadoreclamoComponent,
        RatingReclamoComponent,
        ModalRatingComponent
    ],
    bootstrap: [RatingReclamoComponent],
})
export class PagesModule { }
