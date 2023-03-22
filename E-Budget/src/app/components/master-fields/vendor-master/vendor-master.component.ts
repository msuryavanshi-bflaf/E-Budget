import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { VendorData } from 'src/app/Model/vendor/vendor.module';
import { VendorService } from 'src/app/components/services/vendor.service';

@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.scss']
})
export class VendorMasterComponent {

  public vendorMasterForm!: FormGroup;
   
  
  constructor(private router: Router, private fb: FormBuilder, private VendorService:VendorService) { }


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

  let createVendorRequest:VendorData={
    "vendorName":this.vendorMasterForm.value.vendorName,
    "contactNumber" :this.vendorMasterForm.value.vendorName,
    "email":this.vendorMasterForm.value.vendorName,
    "address":this.vendorMasterForm.value.vendorName,
    
  };
  this.VendorService.createVendor(createVendorRequest).subscribe((data:any)=>{
    
  })
    this.router.navigate([`/${AppConstant.VENDORMASTER}`])

  }

}
