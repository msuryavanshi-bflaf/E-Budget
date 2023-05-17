import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { VendorService } from 'src/app/components/services/vendor.service';
import { VendorData, VendorDetails } from 'src/app/Model/vendor/vendor.module';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.scss'],
})
export class VendorMasterComponent {
  public vendorMasterForm!: FormGroup;
  id: number | undefined;
  vendorData: VendorDetails[] = [];
  event: any;
  currentId: any;
  vendorCompanyNameList: String[] = undefined as any;
  tableHead = [
    'Sr.No.',
    'Vendor Company Name',
    'Email',
    'Address',
    'Person Contact Name',
    'Mobile Number',
    'created Date',
    'Edit',
    'Delete',
  ];
  editMode: boolean = false;
  editBudgetVendorId: any;
  vendorCompanyNameSelected: any;
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private vendorService: VendorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getActiveVendor();
    this.initVendorMasterForm();
    this.initVendorNameList();
  }

  ngAfterViewInit() {
    this.pageChanged({
      pageIndex: 1,
      pageSize: 10,
      length: this.vendorData.length,
    });
  }

  initVendorMasterForm() {
    this.vendorMasterForm = this.fb.group({
      vendorCompanyName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      address: ['', Validators.required],
      vendorSapCode: [''],
      contactPersonName: [''],
      mobileNumber: [''],
      landLineNumber: [''],
    });
  }

  initVendorNameList() {
    this.vendorService.getVendorCompanyNameList().subscribe((res: any) => {
      this.vendorCompanyNameList = [];
      for (const item in res) {
        this.vendorCompanyNameList.push(res[item].budgetCategoryName);
      }
    });
    this.vendorCompanyNameSelected = this.vendorCompanyNameList;
  }

  vendorMaster() {
    let createVendorRequest: VendorData = {
      vendorCompanyName: this.vendorMasterForm.value.vendorCompanyName,
      email: this.vendorMasterForm.value.email,
      address: this.vendorMasterForm.value.address,
      vendorSapCode: this.vendorMasterForm.value.vendorSapCode,
      contactPersonName: this.vendorMasterForm.value.contactPersonName,
      mobileNumber: this.vendorMasterForm.value.mobileNumber,
      landLineNumber: this.vendorMasterForm.value.landLineNumber,
      id: this.currentId,
    };

    if (!this.editMode) {
      this.vendorService
        .createVendor(createVendorRequest)
        .subscribe((data: any) => {
          let StoredData = data.body;

          if (
            data.vendorCompanyName != ""&&
            data.email != "" &&
            data.contactPersonName != "" &&
            data.address != "" &&
            data.vendorSapCode != "" &&
            data.mobileNumber != "" &&
            data.landLineNumber != ""
          ) {
            let isVendorCompanyNameExits =
              this.checkVendorCompanyNameExits(StoredData);

            if (isVendorCompanyNameExits == true) {
              alert('user already exits...');
              this.router.navigate([`/${AppConstant.VENDORMASTER}`]);
            } else {
              Swal.fire({
                title:
                  "<h1 style='color:green' , 'margin-top:100px'>Vendor added successfully..</h1>",
                icon: 'success',
              });
              this.router.navigate([`/${AppConstant.BUDGETCREATION}`]);
            }
          } else {
            Swal.fire({
              title: "<h1 style='color:red'>Please fill all details</h1>",
              icon: 'error',
            });
          }
        });
    } else {
      this.updateVendor(this.currentId, createVendorRequest);
    }
  }

  checkVendorCompanyNameExits(data: VendorData): boolean {
    let vendorData = this.vendorData;

    let isVendorCompanyNameExits = false;

    for (let i = 0; i < vendorData.length; i++) {
      if (
        vendorData[i].vendorCompanyName == data.vendorCompanyName &&
        vendorData[i].email == data.email &&
        vendorData[i].address == data.address &&
        vendorData[i].vendorSapCode == data.vendorSapCode &&
        vendorData[i].contactPersonName == data.contactPersonName &&
        vendorData[i].mobileNumber == data.mobileNumber &&
        vendorData[i].landLineNumber == data.landLineNumber
      ) {
        isVendorCompanyNameExits = true;
      }
    }
    return isVendorCompanyNameExits;
  }

  editVendor(id: String) {
    this.currentId = id;
    let currentProduct = this.vendorData.find((data) => {
      return data.id === id;
    });
    this.vendorMasterForm.setValue({
      vendorCompanyName: currentProduct?.vendorCompanyName,
      email: currentProduct?.email,
      vendorSapCode: currentProduct?.vendorSapCode,
      address: currentProduct?.address,
      contactPersonName: currentProduct?.contactPersonName,
      mobileNumber: currentProduct?.mobileNumber,
      landLineNumber: currentProduct?.landLineNumber,
    });
    this.editMode = true;
  }

  updateVendor(id: String, createVendorRequest: VendorData) {
    this.vendorService
      .editVendor(id, createVendorRequest)
      .subscribe((res: any) => {
        let dataExist = res;

        if (
          res.vendorCompanyName != '' &&
          res.email != '' &&
          res.address != '' &&
          res.vendorSapCode != '' &&
          res.contactPersonName != '' &&
          res.mobileNumber != ''
        ) {
          let isVendorCompanyNameExits =
            this.checkVendorCompanyNameExits(dataExist);

          if (isVendorCompanyNameExits == true) {
            alert('user already exits...');
            this.router.navigate([`/${AppConstant.VENDORMASTER}`]);
          } else {
            Swal.fire({
              title:
                "<h1 style='color:green' , 'margin-top:100px'>Vendor updated successfully..</h1>",
              icon: 'success',
            });
            this.router.navigate([`/${AppConstant.BUDGETCREATION}`]);
          }
        } else {
          Swal.fire({
            title: "<h1 style='color:red'>Please fill all details</h1>",
            icon: 'error',
          });
        }
      });
  }

  back() {
    this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`]);
  }

  numberOnly(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  omit_special_char(event: { charCode: any }) {
    var k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  keyPressAlphanumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);

    if (/^[\.a-zA-Z0-9,-/() ]+$/i.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  addBudgetCategory() {
    this.router.navigate([AppConstant.BUDGETCATEGORYMASTER]);
  }

  getActiveVendor() {
    this.vendorService.getActiveVendor().subscribe((data: any) => {
      this.vendorData = data;
    });
  }

  deleteVendor(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.vendorService.deleteVendor(data.id).subscribe((res: any) => {});
    alert('Vendor deleted Successfully');
    this.getActiveVendor();
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
