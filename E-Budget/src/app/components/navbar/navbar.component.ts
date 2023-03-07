import { Component } from '@angular/core';
import { ASSET_IMAGE } from 'src/app/config/asset.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  appLogo = ASSET_IMAGE.LOGO_IMG;
  bajajLogo = ASSET_IMAGE.BAJAJ_LOGO_IMG;

}
