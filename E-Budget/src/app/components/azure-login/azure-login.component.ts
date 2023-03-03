import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-azure-login',
  templateUrl: './azure-login.component.html',
  styleUrls: ['./azure-login.component.scss']
})

export class AzureLoginComponent {
title = 'msal-angular-tutorial';
isIframe = false;
loginDisplay = false;

constructor(private authService: MsalService) { }

ngOnInit() {
  this.isIframe = window !== window.parent && !window.opener;
}

login() {
  
  this.authService.loginPopup()
    .subscribe({
      next: (result) => {
        console.log(result);
        this.setLoginDisplay();
      },
      error: (error) => console.log(error)
    });
}

setLoginDisplay() {
  this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
}



}
