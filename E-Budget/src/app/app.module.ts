import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AzureLoginComponent } from './components/azure-login/azure-login.component';
import { AzureLoginTestingComponent } from './azure-login-testing/azure-login-testing.component';

@NgModule({
  declarations: [
    AppComponent,
    AzureLoginComponent,
    AzureLoginTestingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
