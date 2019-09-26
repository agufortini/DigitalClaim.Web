// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
import { AngularMaterialModule } from './pages/angular-material.module';

// RUTAS
import { APP_ROUTES } from './app.routes';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { RecuperarPasswordComponent } from './login/recuperar-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecuperarPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
    BrowserAnimationsModule,
    PagesModule,
    ServiceModule,
    AngularMaterialModule,
    APP_ROUTES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
