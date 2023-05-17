import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import {
  SubCategoryData,
  SubCategoryDetails,
} from 'src/app/Model/sub-category/sub-category.module';
import Swal from 'sweetalert2';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-budget-sub-category-master',
  templateUrl: './budget-sub-category-master.component.html',
  styleUrls: ['./budget-sub-category-master.component.scss'],
})
export class BudgetSubCategoryMasterComponent {
  public budgetSubCategoryMasterForm!: FormGroup;
  budgetSubCategoryNameList: String[] = undefined as any;
  selectedTeam = '';
  textArea: any;
  selectedValue: any;
  budgetCategoryNameSelected: any;
  selectedType: string = '';
  budgetType: any = ['Capital', 'Revenue'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  id: number | undefined;
  budgetSubCategoryData: SubCategoryDetails[] = [];
  event: any;
  tableHead = [
    'Sr.No.',
    'Budget Category Name',
    'Budget Code',
    'Budget Sub Category Name',
    'Remark',
    'Created Date-time',
    'Created By',
    'Status',
    'Edit',
    'Delete',
  ];
  editMode: boolean = false;
  currentId: any;
  editBudgetSubCategoryId: any;
  constructor(
    private router: Router,
    private budgetCategoryService: BudgetCategoryService,
    private fb: FormBuilder,
    private budgetSubCategoryService: SubCategoryService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initBudgetSubCategoryMasterForm();
    this.initBudgetCategotryNameList();
    this.getActiveBudgetSubCategory();
  }

  ngAfterViewInit() {
    this.pageChanged({
      pageIndex: 1,
      pageSize: 10,
      length: this.budgetSubCategoryData.length,
    });
  }

  initBudgetSubCategoryMasterForm() {
    this.budgetSubCategoryMasterForm = this.fb.group({
      budgetCategoryName: ['', [Validators.minLength(4)]],

      budgetSubCategoryName: ['', [Validators.minLength(4)]],

      remark: ['', Validators.minLength(4)],

      budgetCode: [''],

      status: [''],

      budgetType: [''],
    });
  }

  budgetSubCategoryMaster() {
    let createSubCategoryRequest: SubCategoryData = {
      budgetCategoryName:
        this.budgetSubCategoryMasterForm.value.budgetCategoryName,
      budgetSubCategoryName:
        this.budgetSubCategoryMasterForm.value.budgetSubCategoryName,
      remark: this.budgetSubCategoryMasterForm.value.remark,
      budgetCode: this.budgetSubCategoryMasterForm.value.budgetCode,
      status: this.budgetSubCategoryMasterForm.value.status,
      budgetType: this.budgetSubCategoryMasterForm.value.budgetType,
      id: this.currentId,
    };

    if (!this.editMode) {
      this.budgetSubCategoryService
        .createSubCategory(createSubCategoryRequest)
        .subscribe((data: any) => {
          let StoredData = data.body;

          if (
            data.body.budgetCode != '' &&
            data.body.budgetSubCategoryName != ''
          ) {
            let isBudgetSubCategoryNameExits =
              this.checkBudgetSubCategoryNameExits(StoredData);

            if (isBudgetSubCategoryNameExits == true) {
              alert('user already exits...');
              this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`]);
            } else {
              Swal.fire({
                title:
                  "<h1 style='color:green' , 'margin-top:100px'>Budget Sub category created successfully..</h1>",
                icon: 'success',
              });
              this.router.navigate([`/${AppConstant.VENDORMASTER}`]);
            }
          } else {
            Swal.fire({
              title: "<h1 style='color:red'>Please fill all details</h1>",
              icon: 'error',
            });
          }
        });
    } else {
      this.updateSubCategory(this.currentId, createSubCategoryRequest);
    }
  }

  checkBudgetSubCategoryNameExits(data: SubCategoryData): boolean {
    let budgetSubCategoryData = this.budgetSubCategoryNameList;

    let isBudgetSubCategoryNameExits = false;

    for (let i = 0; i < budgetSubCategoryData.length; i++) {
      if (budgetSubCategoryData[i] == data.budgetSubCategoryName) {
        isBudgetSubCategoryNameExits = true;
      }
    }
    return isBudgetSubCategoryNameExits;
  }

  back() {
    this.router.navigate([`/${AppConstant.BUDGETCATEGORYMASTER}`]);
  }

  autogrow() {
    let textArea = document.getElementById('description');
    this.textArea.style.overflow = 'hidden';
    this.textArea.style.height = 'auto';
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
  }

  initBudgetCategotryNameList() {
    this.budgetCategoryService.getBudgetCategoryList().subscribe((res: any) => {
      this.budgetSubCategoryNameList = [];
      for (const item in res) {
        this.budgetSubCategoryNameList.push(res[item].budgetCategoryName);
      }
    });
    this.budgetCategoryNameSelected = this.budgetSubCategoryNameList;
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

  selectedValues(event: any) {
    this.selectedType = event.target.value;
  }

  addBudgetCategory() {
    this.router.navigate([AppConstant.BUDGETCATEGORYMASTER]);
  }

  getActiveBudgetSubCategory() {
    this.budgetSubCategoryService
      .getActiveBudgetSubCategory()
      .subscribe((data: any) => {
        this.budgetSubCategoryData = data;
      });
  }

  deleteCategory(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.budgetSubCategoryService
        .deleteSubCategory(data.id)
        .subscribe((res: any) => {});
    alert('Record deleted Successfully');
    this.getActiveBudgetSubCategory();
  }

  editSubCategory(id: String) {
    this.currentId = id;
    let currentProduct = this.budgetSubCategoryData.find((data) => {
      return data.id === id;
    });
    this.budgetSubCategoryMasterForm.setValue({
      budgetCategoryName: currentProduct?.budgetCategoryName,
      budgetSubCategoryName: currentProduct?.budgetSubCategoryName,
      budgetCode: currentProduct?.budgetCode,
      remark: currentProduct?.remark,
      status: currentProduct?.status,
      budgetType: currentProduct?.budgetType,
    });
    this.editMode = true;
  }

  updateSubCategory(id: String, createSubCategoryRequest: SubCategoryData) {
    this.budgetSubCategoryService
      .editSubCategory(id, createSubCategoryRequest)
      .subscribe((res: any) => {
        let dataExist = res;

        if (res.budgetCode != '' && res.budgetSubCategoryName != '') {
          let isBudgetSubCategoryNameExits =
            this.checkSubBudgetCategoryNameExits(dataExist);

          if (isBudgetSubCategoryNameExits == true) {
            alert('user already exits...');
            this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`]);
          } else {
            Swal.fire({
              title:
                "<h1 style='color:green' , 'margin-top:100px'>Budget sub-category updated successfully..</h1>",
              icon: 'success',
            });
            this.router.navigate([`/${AppConstant.VENDORMASTER}`]);
          }
        } else {
          Swal.fire({
            title: "<h1 style='color:red'>Please fill all details</h1>",
            icon: 'error',
          });
        }
      });
  }

  checkSubBudgetCategoryNameExits(data: SubCategoryData): boolean {
    let budgetSubCategoryData = this.budgetSubCategoryData;

    let isSubBudgetCategoryNameExits = false;

    for (let i = 0; i < budgetSubCategoryData.length; i++) {
      if (
        budgetSubCategoryData[i].budgetCategoryName ==
          data.budgetCategoryName &&
        budgetSubCategoryData[i].budgetSubCategoryName ==
          data.budgetSubCategoryName &&
        budgetSubCategoryData[i].budgetCode == data.budgetCode &&
        budgetSubCategoryData[i].remark == data.remark &&
        budgetSubCategoryData[i].status == data.status &&
        budgetSubCategoryData[i].budgetType == data.budgetType
      ) {
        isSubBudgetCategoryNameExits = true;
      }
    }
    return isSubBudgetCategoryNameExits;
  }

  pageChanged(event: PageEvent) {
    event.length;
    const budgetSubCategoryData = [...this.budgetSubCategoryData];
    let dataSource = this.budgetSubCategoryData.splice(
      (event.pageIndex - 1) * event.pageSize,
      event.pageSize
    );
  }
}
