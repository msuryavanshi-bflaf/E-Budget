import { style } from '@angular/animations';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import {
  BudgetCategoryData,
  BudgetCategoryDetails,
} from 'src/app/Model/budget-category/budget-creation.module';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { first } from 'rxjs/operators';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-budget-category-master',
  templateUrl: './budget-category-master.component.html',
  styleUrls: ['./budget-category-master.component.scss'],
})
export class BudgetCategoryMasterComponent {
  public budgetCategoryMasterForm!: FormGroup;
  showMsg: boolean = false;
  budgetCategoryNameList: String[] = undefined as any;
  checked = true;
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  id: number | undefined;
  budgetCategoryData: BudgetCategoryDetails[] = [];
  event: any;
  value: any;
  tableHead = [
    'Sr.No.',
    'Budget Category Name',
    'Remark',
    'Created Date',
    'Created By',
    'Status',
    'Edit',
    'Delete',
  ];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private budgetCategoryService: BudgetCategoryService,
    private route: ActivatedRoute
  ) {}
  data: any;
  index: any;
  textArea: any;
  res: any;
  editMode: boolean = false;
  currentId: any;

  ngOnInit() {
    this.getActiveCategory();
    this.initBudgetCategoryMasterForm();
    this.initBudgetCategotryNameList();
  }

  ngAfterViewInit() {
    this.pageChanged({
      pageIndex: 10,
      pageSize: 3,
      length: this.budgetCategoryData.length,
    });
  }

  initBudgetCategoryMasterForm() {
    this.budgetCategoryMasterForm = this.fb.group({
      budgetCategoryName: ['', [Validators.minLength(4)]],
      remark: ['', [Validators.minLength(4)]],
      status: [''],
    });
  }

  initBudgetCategotryNameList() {
    this.budgetCategoryService.getBudgetCategoryList().subscribe((res) => {
      this.budgetCategoryNameList = [];
      for (const item in res) {
        this.budgetCategoryNameList.push(res[item].budgetCategoryName);
      }
    });
  }

  editBudgetCategoryMaster() {
    console.log('hhjhjhjhjhjj');
  }

  budgetCategoryMaster() {
    let createBudgetCategoryRequest: BudgetCategoryData = {
      id: this.currentId,
      budgetCategoryName:
        this.budgetCategoryMasterForm.value.budgetCategoryName,
      remark: this.budgetCategoryMasterForm.value.remark,
      status: this.budgetCategoryMasterForm.value.status,
    };

    if (!this.editMode) {
      this.budgetCategoryService
        .createBudgetCategory(createBudgetCategoryRequest)
        .subscribe((data: any) => {
          let StoredData = data.body;

          if (data.body.budgetCategoryName != '' && data.body.remark != '') {
            let isBudgetCategoryNameExits =
              this.checkBudgetCategoryNameExits(StoredData);

            if (isBudgetCategoryNameExits == true) {
              alert('user already exits...');
            } else {
              Swal.fire({
                title:
                  "<h1 style='color:green' , 'margin-top:100px'>Budget category created successfully..</h1>",
                icon: 'success',
              });
              this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`]);
            }
          } else {
            Swal.fire({
              title: "<h1 style='color:red'>Please fill all details</h1>",
              icon: 'error',
            });
          }
        });
    } else {
      this.updateCategory(this.currentId, createBudgetCategoryRequest);
    }
  }

  checkBudgetCategoryNameExits(data: BudgetCategoryDetails): boolean {
    let budgetCategoryCheck = this.budgetCategoryData;

    let isBudgetCategoryNameExits = false;

    for (let i = 0; i < budgetCategoryCheck.length; i++) {
      if (
        budgetCategoryCheck[i].budgetCategoryName == data.budgetCategoryName &&
        budgetCategoryCheck[i].status == data.status &&
        budgetCategoryCheck[i].remark == data.remark
      ) {
        isBudgetCategoryNameExits = true;
      }
    }
    return isBudgetCategoryNameExits;
  }

  autogrow() {
    let textArea = document.getElementById('description');
    this.textArea.style.overflow = 'hidden';
    this.textArea.style.height = 'auto';
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
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

  getbudgetCategoryDetails() {
    this.budgetCategoryService
      .getAllBudgetCategoryList()
      .subscribe((data: any) => {
        this.budgetCategoryData = data;
      });
  }

  getActiveCategory() {
    this.budgetCategoryService.getActiveCategory().subscribe((data: any) => {
      this.budgetCategoryData = data;
    });
  }

  deleteCategory(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.budgetCategoryService
        .deleteCategory(data.id)
        .subscribe((res: any) => {});
    alert('Record deleted Successfully');
    this.getActiveCategory();
  }

  editCategory(id: String) {
    this.currentId = id;
    let currentProduct = this.budgetCategoryData.find((data) => {
      return data.id === id;
    });
    this.budgetCategoryMasterForm.setValue({
      budgetCategoryName: currentProduct?.budgetCategoryName,
      remark: currentProduct?.remark,
      status: currentProduct?.status,
    });
    this.editMode = true;
  }

  updateCategory(id: String, createBudgetCategoryRequest: BudgetCategoryData) {
    this.budgetCategoryService
      .editCategory(id, createBudgetCategoryRequest)
      .subscribe((res: any) => {
        let dataExist = res;

        if (res.budgetCategoryName != '' && res.remark != '') {
          let isBudgetCategoryNameExits =
            this.checkBudgetCategoryNameExits(dataExist);

          if (isBudgetCategoryNameExits == true) {
            alert('user already exits...');
            this.router.navigate([`/${AppConstant.BUDGETCATEGORYMASTER}`]);
          } else {
            Swal.fire({
              title:
                "<h1 style='color:green' , 'margin-top:100px'>Budget category updated successfully..</h1>",
              icon: 'success',
            });
            this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`]);
          }
        } else {
          Swal.fire({
            title: "<h1 style='color:red'>Please fill all details</h1>",
            icon: 'error',
          });
        }
      });
  }

  pageChanged(event: PageEvent) {
    event.length;
    const budgetCategoryData = [...this.budgetCategoryData];
    let dataSource = this.budgetCategoryData.splice(
      (event.pageIndex - 1) * event.pageSize,
      event.pageSize
    );
  }
}
