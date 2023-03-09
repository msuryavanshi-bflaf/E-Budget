import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _formBuilder: FormBuilder) { }
  isLinear = false;
}

