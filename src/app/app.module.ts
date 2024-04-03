import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './pages/login/login.module';
import { HomeModule } from './pages/home/home.module';
import { LayoutModule } from './layouts/layout.module';
import { SharedModule } from './shared/shared.module';
import { PermissionsModule } from './pages/permissions/permissions.module';
import { ButtonModule } from "primeng/button";

import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { AccessdeniedComponent } from './pages/accessdenied/accessdenied.component';


@NgModule({
  declarations: [
    AppComponent,
    AccessdeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    PermissionsModule,
    HomeModule,
    ButtonModule,
    LayoutModule,
    SharedModule,
    HttpClientModule,
  ],  
  providers: [
    // provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
