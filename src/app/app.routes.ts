import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { RecuperarPasswordComponent } from './login/recuperar-password.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'recuperar-password', component: RecuperarPasswordComponent},
    { path: '**', redirectTo: '/login'}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
