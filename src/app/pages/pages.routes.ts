import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { GenerarReclamoCiudadanoComponent } from './generar-reclamo/generar-reclamo-ciudadano/generar-reclamo-ciudadano.component';
import { GenerarReclamoMunicipalComponent } from './generar-reclamo/generar-reclamo-municipal/generar-reclamo-municipal.component';
import { RegistrarReclamoComponent } from './registrar-reclamo/registrar-reclamo.component';
import { ConsultarReclamoComponent } from './consultar-reclamo/consultar-reclamo.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CrearOrdenServicioComponent } from './crear-orden-servicio/crear-orden-servicio.component';
import { RegistrarOrdenServicioComponent } from './registrar-orden-servicio/registrar-orden-servicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReporteComponent } from './reporte/reporte.component';
import { GestionarOrdenServicioComponent } from './gestionar-orden-servicio/gestionar-orden-servicio.component';
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
import { AyudaRegistrarReclamoComponent } from '../pages/ayuda/ayuda-registrar-reclamo/ayuda-registrar-reclamo.component';
import { AyudaConsultarReclamoComponent } from '../pages/ayuda/ayuda-consultar-reclamo/ayuda-consultar-reclamo.component';
import { AyudaCalificarReclamoComponent } from '../pages/ayuda/ayuda-calificar-reclamo/ayuda-calificar-reclamo.component';

// LOGIN GUARD
import { LoginGuard } from '../_guards/login.guard';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'home', component: HomeComponent, data: { titulo: 'Inicio' }, canActivate: [LoginGuard] },
            { path: 'generar-reclamo-ciudadano', component: GenerarReclamoCiudadanoComponent, data: { titulo: 'Reclamo', subtitulo: 'Registrar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'generar-reclamo-municipal', component: GenerarReclamoMunicipalComponent, data: { titulo: 'Reclamo', subtitulo: 'Registrar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'registrar-reclamo', component: RegistrarReclamoComponent, data: { titulo: 'Reclamo', subtitulo: 'Enviar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'consultar-reclamo', component: ConsultarReclamoComponent, data: { titulo: 'Reclamo', subtitulo: 'Consultar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'contacto', component: ContactoComponent, data: { titulo: 'Contacto' }, canActivate: [LoginGuard]},
            { path: 'crear-orden-servicio', component: CrearOrdenServicioComponent, data: { titulo: 'Orden de Servicio', subtitulo: 'Generar Orden de Servicio' }, canActivate: [LoginGuard]},
            { path: 'registrar-orden-servicio', component: RegistrarOrdenServicioComponent, data: { titulo: 'Orden de Servicio', subtitulo: 'Registrar Orden de Servicio' }, canActivate: [LoginGuard]},
            { path: 'gestionar-orden-servicio', component: GestionarOrdenServicioComponent, data: { titulo: 'Orden de Servicio', subtitulo: 'Gestionar Orden de Servicio' }, canActivate: [LoginGuard]},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' }, canActivate: [LoginGuard]},
            { path: 'reporte', component: ReporteComponent, data: { titulo: 'Reportes' }, canActivate: [LoginGuard]},
            { path: 'area-servicio', component: AreaServicioComponent, data: { titulo: 'Dominio', subtitulo: 'Area de Servicio'}, canActivate: [LoginGuard]},
            { path: 'barrio', component: BarrioComponent, data: { titulo: 'Dominio', subtitulo: 'Barrio'}, canActivate: [LoginGuard]},
            { path: 'calle', component: CalleComponent, data: { titulo: 'Dominio', subtitulo: 'Calle'}, canActivate: [LoginGuard]},
            { path: 'canal', component: CanalComponent, data: { titulo: 'Dominio', subtitulo: 'Canal'}, canActivate: [LoginGuard]},
            { path: 'reclamo', component: ReclamoComponent, data: { titulo: 'Dominio', subtitulo: 'Reclamo'}, canActivate: [LoginGuard]},
            { path: 'prioridad', component: PrioridadComponent, data: { titulo: 'Dominio', subtitulo: 'Prioridad'}, canActivate: [LoginGuard]},
            { path: 'rol', component: RolComponent, data: { titulo: 'Dominio', subtitulo: 'Rol'}, canActivate: [LoginGuard]},
            { path: 'usuario', component: UsuarioComponent, data: { titulo: 'Dominio', subtitulo: 'Usuario' }, canActivate: [LoginGuard]},
            { path: 'estado-orden-servicio', component: EstadoOrdenServicioComponent, data: { titulo: 'Dominio', subtitulo: 'Estado: Orden Servicio' }, canActivate: [LoginGuard]},
            { path: 'estado-reclamo', component: EstadoReclamoComponent, data: { titulo: 'Dominio', subtitulo: 'Estado: Reclamo' }, canActivate: [LoginGuard]},
            { path: 'personal', component: PersonalComponent, data: { titulo: 'Dominio', subtitulo: 'Personal' }, canActivate: [LoginGuard]},
            { path: 'ayuda-registrar-reclamo', component: AyudaRegistrarReclamoComponent, data: { titulo: 'Ayuda', subtitulo: 'Registrar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'ayuda-consultar-reclamo', component: AyudaConsultarReclamoComponent, data: { titulo: 'Ayuda', subtitulo: 'Consultar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'ayuda-calificar-reclamo', component: AyudaCalificarReclamoComponent, data: { titulo: 'Ayuda', subtitulo: 'Calificar Reclamo' }, canActivate: [LoginGuard]},
            { path: '**', redirectTo: '/login'}
        ]
    },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
