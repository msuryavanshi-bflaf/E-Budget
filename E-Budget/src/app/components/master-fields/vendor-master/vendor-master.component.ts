import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.scss']
})
export class VendorMasterComponent {

  public vendorMasterForm!: FormGroup;
   
  
  constructor(private router: Router, private fb: FormBuilder) { }


  ngOnInit() {

    this.initVendorMasterForm();
  }


  initVendorMasterForm() {

    this.vendorMasterForm = this.fb.group({

      'vendorName': ['', [Validators.minLength(4)]],
      'email':['',[Validators.email]],
      'contactNumber':['',Validators.maxLength(10)],
      'address':['',Validators.minLength(4)]
    });

  }

  numberOnly(event:any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

 vendorMaster() {

    this.router.navigate([`/${AppConstant.NAVBAR}`])

  }

}
