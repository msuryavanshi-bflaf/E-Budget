import { Component } from '@angular/core';
import { ASSET_IMAGE } from 'src/app/config/asset.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  appLogo = ASSET_IMAGE.LOGO_IMG;
}
