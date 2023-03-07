import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent{
  constructor(private router: Router) { }

  login() {
    this.router.navigate([`/${AppConstant.NAVBAR}`]);
  }
}
