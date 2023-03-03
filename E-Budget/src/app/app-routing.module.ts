import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { AzureLoginComponent } from './components/azure-login/azure-login.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: 'azure-login',
    component: AzureLoginComponent,
    canActivate:[MsalGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
   initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
