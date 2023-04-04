import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
// import { VendorData } from 'src/app/Model/vendor/vendor.module';

import { VendorService } from 'src/app/components/services/vendor.service';
import { VendorData } from 'src/app/Model/vendor/vendor.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.scss']
})
export class VendorMasterComponent {

  public vendorMasterForm!: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private VendorService: VendorService) { }


  ngOnInit() {

    this.initVendorMasterForm();
  }


  initVendorMasterForm() {

    this.vendorMasterForm = this.fb.group({

      'vendorCompanyName': ['', [Validators.required]],
      'email': ['', [Validators.email]],
      'address': ['', Validators.required],
      'vendorSapCode': [''],
      'contactPersonName': [''],
      'mobileNumber': [''],
      'landLineNumber': ['']
    });

  }

  numberOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  vendorMaster() {

    let createVendorRequest: VendorData = {
      "vendorCompanyName": this.vendorMasterForm.value.vendorCompanyName,
      "email": this.vendorMasterForm.value.email,
      "address": this.vendorMasterForm.value.address,
      "vendorSapCode": this.vendorMasterForm.value.vendorSapCode,
      "contactPersonName": this.vendorMasterForm.value.contactPersonName,
      "mobileNumber": this.vendorMasterForm.value.mobileNumber,
      "landLineNumber": this.vendorMasterForm.value.landLineNumber,
      "id":this.vendorMasterForm.value.id,
      "activation_date":this.vendorMasterForm.value.id,
    };


    this.VendorService.createVendor(createVendorRequest).subscribe((data: any) => {

      if (data.body.vendorCompanyName != "" && data.body.email != "" && data.body.address != "" && data.body.vendorSapCode != "" && data.body.contactPersonName != "" && data.body.mobileNumber != "") {

        this.router.navigate([`/${AppConstant.VENDORMASTER}`])
        Swal.fire('Vendor added successfully')

      }

      else {

        Swal.fire({
          title: "<h1 style='color:red'>Please fill all details</h1>",
          icon: 'error',

        })

      }





    })

  }


back(){
  this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`])

}


  omit_special_char(event: { charCode: any; }) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  // Only AlphaNumeric
  keyPressAlphanumeric(event: any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

}
