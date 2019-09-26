import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { GenerarReclamoComponent } from './generar-reclamo/generar-reclamo.component';
import { RegistrarReclamoComponent } from './registrar-reclamo/registrar-reclamo.component';
import { ConsultarReclamoComponent } from './consultar-reclamo/consultar-reclamo.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CrearOrdenServicioComponent } from './crear-orden-servicio/crear-orden-servicio.component';
import { RegistrarOrdenServicioComponent } from './registrar-orden-servicio/registrar-orden-servicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReporteComponent } from './reporte/reporte.component';
import { GestionarOrdenServicioComponent } from './gestionar-orden-servicio/gestionar-orden-servicio.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { AreaServicioComponent } from '../pages/admin-municipal/area-servicio/area-servicio.component';
import { BarrioComponent } from '../pages/admin-municipal/barrio/barrio.component';
import { CalleComponent } from '../pages/admin-municipal/calle/calle.component';
import { CanalComponent } from './admin-municipal/canal/canal.component';
import { ReclamoComponent } from '../pages/admin-operativo/reclamo/reclamo.component';
import { UsuarioComponent } from '../pages/admin-municipal/usuario/usuario.component';

// LOGIN GUARD
import { LoginGuard } from '../_guards/login.guard';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'home', component: HomeComponent, data: { titulo: 'Inicio' }, canActivate: [LoginGuard] },
            { path: 'generar-reclamo', component: GenerarReclamoComponent, data: { titulo: 'Reclamo', subtitulo: 'Registrar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'registrar-reclamo', component: RegistrarReclamoComponent, data: { titulo: 'Reclamo', subtitulo: 'Enviar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'consultar-reclamo', component: ConsultarReclamoComponent, data: { titulo: 'Reclamo', subtitulo: 'Consultar Reclamo' }, canActivate: [LoginGuard]},
            { path: 'contacto', component: ContactoComponent, data: { titulo: 'Contacto' }, canActivate: [LoginGuard]},
            { path: 'crear-ordenServicio', component: CrearOrdenServicioComponent, data: { titulo: 'Orden de Servicio', subtitulo: 'Generar Orden de Servicio' }, canActivate: [LoginGuard]},
            { path: 'registrar-ordenServicio', component: RegistrarOrdenServicioComponent, data: { titulo: 'Orden de Servicio', subtitulo: 'Registrar Orden de Servicio' }, canActivate: [LoginGuard]},
            { path: 'gestionar-ordenServicio', component: GestionarOrdenServicioComponent, data: { titulo: 'Orden de Servicio', subtitulo: 'Gestionar Orden de Servicio' }, canActivate: [LoginGuard]},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' }, canActivate: [LoginGuard]},
            { path: 'reporte', component: ReporteComponent, data: { titulo: 'Reportes' }, canActivate: [LoginGuard]},
            { path: 'ayuda', component: AyudaComponent, data: { titulo: 'Ayuda' }, canActivate: [LoginGuard]},
            { path: 'area-servicio', component: AreaServicioComponent, data: { titulo: 'Dominio', subtitulo: 'Area de Servicio'}, canActivate: [LoginGuard]},
            { path: 'barrio', component: BarrioComponent, data: { titulo: 'Dominio', subtitulo: 'Barrio'}, canActivate: [LoginGuard]},
            { path: 'calle', component: CalleComponent, data: { titulo: 'Dominio', subtitulo: 'Calle'}, canActivate: [LoginGuard]},
            { path: 'canal', component: CanalComponent, data: { titulo: 'Dominio', subtitulo: 'Canal'}, canActivate: [LoginGuard]},
            { path: 'reclamo', component: ReclamoComponent, data: { titulo: 'Dominio', subtitulo: 'Reclamo'}, canActivate: [LoginGuard]},
            { path: 'usuario', component: UsuarioComponent, data: { titulo: 'Dominio', subtitulo: 'Usuario' }, canActivate: [LoginGuard]},
            { path: '**', redirectTo: '/login'}
        ]
    },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);