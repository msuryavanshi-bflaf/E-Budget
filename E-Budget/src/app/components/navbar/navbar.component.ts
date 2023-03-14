import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ASSET_IMAGE } from 'src/app/config/asset.config';
import { AppConstant } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  appLogo = ASSET_IMAGE.LOGO_IMG;
  bajajLogo = ASSET_IMAGE.BAJAJ_LOGO_IMG;
  constructor(private router: Router) { }
  options() {
    this.router.navigate([`/${AppConstant.NAVBAR}`]);
  }
}
