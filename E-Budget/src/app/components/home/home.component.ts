import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _formBuilder: FormBuilder,private router: Router) { }
  isLinear = false;
  
}

