import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { GenerarReclamoCiudadanoComponent } from './generar-reclamo/generar-reclamo-ciudadano/generar-reclamo-ciudadano.component';
import { GenerarReclamoMunicipalComponent } from './generar-reclamo/generar-reclamo-municipal/generar-reclamo-municipal.component';
import { RegistrarReclamoComponent } from './registrar-reclamo/registrar-reclamo.component';
import { ConsultarReclamoComponent } from './consultar-reclamo/consultar-reclamo.component';
import { CrearOrdenServicioComponent } from './crear-orden-servicio/crear-orden-servicio.component';
import { RegistrarOrdenServicioComponent } from './registrar-orden-servicio/registrar-orden-servicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReporteComponent } from './reporte/reporte.component';
import { AreaServicioComponent } from '../pages/admin-municipal/area-servicio/area-servicio.component';
import { BarrioComponent } from '../pages/admin-municipal/barrio/barrio.component';
import { CalleComponent } from '../pages/admin-municipal/calle/calle.component';
import { CanalComponent } from './admin-municipal/canal/canal.component';
import { ReclamoComponent } from '../pages/admin-operativo/reclamo/reclamo.component';
import { PrioridadComponent } from '../pages/admin-operativo/prioridad/prioridad.component';
import { RolComponent } from './admin-municipal/rol/rol.component';
import { UsuarioComponent } from '../pages/admin-municipal/usuario/usuario.component';
import { EstadoOrdenServicioComponent } from '../pages/admin-municipal/estado/estado-orden-servicio/estado-orden-servicio.component';
import { EstadoReclamoComponent } from '../pages/admin-municipal/estado/estado-reclamo/estado-reclamo.component';
import { PersonalComponent } from '../pages/admin-operativo/personal/personal.component';
import { AyudaRegistrarReclamoComponent } from './ayuda/Reclamante/ayuda-registrar-reclamo/ayuda-registrar-reclamo.component';
import { AyudaConsultarReclamoComponent } from './ayuda/Reclamante/ayuda-consultar-reclamo/ayuda-consultar-reclamo.component';
import { AyudaCalificarReclamoComponent } from './ayuda/Reclamante/ayuda-calificar-reclamo/ayuda-calificar-reclamo.component';
import { AyudaRegistrarReclamoMunicipalComponent } from '../pages/ayuda/Municipal/ayuda-registrar-reclamo-municipal/ayuda-registrar-reclamo-municipal.component';
import { AyudaConsultarReclamoMunicipalComponent } from '../pages/ayuda/Municipal/ayuda-consultar-reclamo-municipal/ayuda-consultar-reclamo-municipal.component';
import { AyudaDominioMunicipalComponent } from '../pages/ayuda/Municipal/ayuda-dominio-municipal/ayuda-dominio-municipal.component';
import { AyudaReportesMunicipalComponent } from '../pages/ayuda/Municipal/ayuda-reportes-municipal/ayuda-reportes-municipal.component';

// LOGIN GUARD
import { LoginGuard } from '../_guards/login.guard';

const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
            { path: 'home', component: HomeComponent, data: { titulo: 'Inicio' }, canActivate: [LoginGuard] },
            { path: 'generar-reclamo-ciudadano', component: GenerarReclamoCiudadanoComponent, data: { titulo: 'Reclamo', subtitulo: 'Generar Reclamo' }},
            { path: 'generar-reclamo-municipal', component: GenerarReclamoMunicipalComponent, data: { titulo: 'Reclamo', subtitulo: 'Generar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'registrar-reclamo', component: RegistrarReclamoComponent, data: { titulo: 'Reclamo', subtitulo: 'Registrar Reclamo' }},
            { path: 'consultar-reclamo', component: ConsultarReclamoComponent, data: { titulo: 'Reclamo', subtitulo: 'Consultar Reclamo' }},
            { path: 'crear-orden-servicio', component: CrearOrdenServicioComponent, data: { titulo: 'Orden de Servicio', subtitulo: 'Generar Orden de Servicio' }, canActivate: [LoginGuard]},
            { path: 'registrar-orden-servicio', component: RegistrarOrdenServicioComponent, data: { titulo: 'Orden de Servicio', subtitulo: 'Registrar Orden de Servicio' }},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil', subtitulo: 'Perfil'}},
            { path: 'reporte', component: ReporteComponent, data: { titulo: 'Reportes', subtitulo: 'Reportes' }},
            { path: 'area-servicio', component: AreaServicioComponent, data: { titulo: 'Dominio', subtitulo: 'Area de Servicio'}},
            { path: 'barrio', component: BarrioComponent, data: { titulo: 'Dominio', subtitulo: 'Barrio'}},
            { path: 'calle', component: CalleComponent, data: { titulo: 'Dominio', subtitulo: 'Calle'}},
            { path: 'canal', component: CanalComponent, data: { titulo: 'Dominio', subtitulo: 'Canal'}},
            { path: 'reclamo', component: ReclamoComponent, data: { titulo: 'Dominio', subtitulo: 'Tipo de Reclamo'}},
            { path: 'prioridad', component: PrioridadComponent, data: { titulo: 'Dominio', subtitulo: 'Prioridad'}},
            { path: 'rol', component: RolComponent, data: { titulo: 'Dominio', subtitulo: 'Rol'}},
            { path: 'usuario', component: UsuarioComponent, data: { titulo: 'Dominio', subtitulo: 'Usuario' }},
            { path: 'estado-orden-servicio', component: EstadoOrdenServicioComponent, data: { titulo: 'Dominio', subtitulo: 'Estado: Orden Servicio' }},
            { path: 'estado-reclamo', component: EstadoReclamoComponent, data: { titulo: 'Dominio', subtitulo: 'Estado: Reclamo' }},
            { path: 'personal', component: PersonalComponent, data: { titulo: 'Dominio', subtitulo: 'Personal' }},
            { path: 'ayuda-registrar-reclamo', component: AyudaRegistrarReclamoComponent, data: { titulo: 'Ayuda', subtitulo: 'Registrar Reclamo' }},
            { path: 'ayuda-consultar-reclamo', component: AyudaConsultarReclamoComponent, data: { titulo: 'Ayuda', subtitulo: 'Consultar Reclamo' }},
            { path: 'ayuda-calificar-reclamo', component: AyudaCalificarReclamoComponent, data: { titulo: 'Ayuda', subtitulo: 'Calificar Reclamo' }},
            { path: 'ayuda-registrar-reclamo-municipal', component: AyudaRegistrarReclamoMunicipalComponent, data: { titulo: 'Ayuda', subtitulo: 'Registrar Reclamo' }},
            { path: 'ayuda-consultar-reclamo-municipal', component: AyudaConsultarReclamoMunicipalComponent, data: { titulo: 'Ayuda', subtitulo: 'Consultar Reclamo' }},
            { path: 'ayuda-dominio-municipal', component: AyudaDominioMunicipalComponent, data: { titulo: 'Ayuda', subtitulo: 'Dominio' }},
            { path: 'ayuda-reportes-municipal', component: AyudaReportesMunicipalComponent, data: { titulo: 'Ayuda', subtitulo: 'Reportes' }},
        ], canActivate: [LoginGuard]
    },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
