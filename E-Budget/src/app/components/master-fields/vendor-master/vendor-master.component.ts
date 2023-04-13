import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
// import { VendorData } from 'src/app/Model/vendor/vendor.module';

import { VendorService } from 'src/app/components/services/vendor.service';
import { VendorData } from 'src/app/Model/vendor/vendor.module';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.scss']
})
export class VendorMasterComponent {

  public vendorMasterForm!: FormGroup;
  id: number | undefined;
  vendorData: VendorData[] = [];
  event: any;
  tableHead = ['Sr.No.', 'Vendor Company Name', 'Email', 'Address', 'Person Contact Name', 'Mobile Number', 'created Date', 'Edit', 'Delete'];
  editMode: boolean = false;
  editBudgetVendorId: any;
  // constructor(private router: Router, private http: HttpClient, private activeVendor: VendorService, private route: ActivatedRoute ) { }



  constructor(private router: Router, private fb: FormBuilder, private VendorService: VendorService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.getActiveVendor();
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
  editCategory(vendorId: any, index: number) {
    this.editMode = true;
    console.log(vendorId);
    console.log(this.vendorData[index]);
    this.editBudgetVendorId = vendorId;
    this.vendorMasterForm.setValue({
      vendorCompanyName: this.vendorData[index].vendorCompanyName,
      email: this.vendorData[index].email,
      contactPersonName: this.vendorData[index].contactPersonName,
      mobileNumber: this.vendorData[index].mobileNumber,
      landLineNumber: this.vendorData[index].landLineNumber,
      address: this.vendorData[index].address,
      vendorSapCode: this.vendorData[index].vendorSapCode

    })
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
      "id": this.vendorMasterForm.value.id,
      "activation_date": this.vendorMasterForm.value.id,
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


  back() {
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

    if (/^[a-z\d\-_\s]+$/i.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }




  addBudgetCategory() {
    this.router.navigate([AppConstant.BUDGETCATEGORYMASTER]);
  }

  // getbudgetCategoryDetails() {
  //   this.budgetCategoryService.getAllBudgetCategoryList().subscribe((data: any) => {
  //     this.vendorData = data;

  //   });
  // }

  getActiveVendor() {
    this.VendorService.getActiveVendor().subscribe((data: any) => {
      this.vendorData = data;
    });
  }

  deleteCategory(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.VendorService.deleteVendor(data.id).subscribe((res: any) => {
      })
    alert('Record deleted Successfully')
    this.getActiveVendor()



    //  searchCategory(event:any){
    //   let filteredEmployees: BudgetCategoryDetails[] = [];
    //   if (event === '') {
    //     this.getActiveCategory = this.addBudgetCategory;
    //   } else {
    //     filteredEmployees = this.budgetCategoryData.filter((budgetCategoryData, index) => {
    //       let targetKey = budgetCategoryData.budgetCategoryName.toLowerCase();
    //       let searchKey = event.toLowerCase();
    //       return targetKey.includes(searchKey)
    //     })
    //     this.budgetCategoryData = filteredEmployees;
    //   }
    // }

  }

  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    // this should be moved in API CALL
    this.pageChanged({
      pageIndex: 1,
      pageSize: 10,
      length: this.vendorData.length
    });
  }

  pageChanged(event: PageEvent) {
    event.length;
    const budgetCategoryData = [...this.vendorData];
    let dataSource = this.vendorData.splice(
      (event.pageIndex - 1) * event.pageSize,
      event.pageSize
    );
  }

}
