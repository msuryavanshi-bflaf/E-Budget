import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { SubCategoryData } from 'src/app/Model/sub-category/sub-category.module';
import Swal from 'sweetalert2';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-budget-sub-category-master',
  templateUrl: './budget-sub-category-master.component.html',
  styleUrls: ['./budget-sub-category-master.component.scss']
})
export class BudgetSubCategoryMasterComponent {

  public budgetSubCategoryMasterForm !: FormGroup;
  budgetCategoryNameList: String[] = undefined as any;
  budgetCodeList: String[] = undefined as any;
  selectedTeam = '';
  textArea: any;
  selectedValue: any;
  budgetCategoryNameSelected: any;
  selectedType: string = '';
  budgetType: any = ['Capital', 'Revenue'];

  id: number | undefined;
  budgetSubCategoryData: SubCategoryData[] = [];
  event: any;
  tableHead = ['Sr.No.', 'Budget Code', 'Budget Category Name', 'Budget Sub Category Name', 'Created Date-time', 'Created By', 'Status', 'Edit', 'Delete'];
  editMode: boolean = false;

  editBudgetSubCategoryId: any;
  constructor(private router: Router, private budgetCategoryService: BudgetCategoryService, private fb: FormBuilder, private budgetSubCategoryService: SubCategoryService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {

    this.initBudgetSubCategoryMasterForm();
    this.initBudgetCategotryNameList();
    this.getActiveBudgetSubCategory();
    this.initBudgetCodeList();
  }


  initBudgetSubCategoryMasterForm() {

    this.budgetSubCategoryMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],

      'budgetSubCategoryName': ['', [Validators.minLength(4)]],

      'remark': ['', Validators.minLength(4)],

      'budgetCode': [''],

      'status': [''],

      'createdBy': [''],

      'budgetType': [''],
    });
  }
  budgetSubCategoryMaster() {
    let createSubCategoryRequest: SubCategoryData = {
      "budgetCategoryName": this.budgetSubCategoryMasterForm.value.budgetCategoryName,
      "budgetSubCategoryName": this.budgetSubCategoryMasterForm.value.budgetSubCategoryName,
      "remark": this.budgetSubCategoryMasterForm.value.remark,
      "budgetCode": this.budgetSubCategoryMasterForm.value.budgetCode,
      "status": this.budgetSubCategoryMasterForm.value.status,
      "createdBy": this.budgetSubCategoryMasterForm.value.createdBy,
      "budgetType": this.budgetSubCategoryMasterForm.value.budgetType,
      "id": this.budgetSubCategoryMasterForm.value.id,
      "activation_date": this.budgetSubCategoryMasterForm.value.activation_date
    };
    this.budgetSubCategoryService.createSubCategory(createSubCategoryRequest).subscribe((data: any) => {
      let StoredData = data.body;
      if (data.body.budgetCode != "" && data.body.budgetSubCategoryName != "") {

        let isBudgetCategoryNameExits = this.checkBudgetCategoryNameExits(StoredData);

        if (isBudgetCategoryNameExits == true) {

          alert('budget code  already exits...')
          this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`])

        }
        //   this.router.navigate([`/${AppConstant.VENDORMASTER}`])
        //   Swal.fire('Budget SubCategory added successfully')

        // }

        //   else {

        //     Swal.fire({
        //       title: "<h1 style='color:red'>Please fill all details</h1>",
        //       icon: 'error',

        //     })

        //   }
        // })
        else {
          Swal.fire({
            title: "<h1 style='color:green' , 'margin-top:100px'>Budget category created successfully..</h1>",
            icon: 'success'
          })
          this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`])
        }


      }

      else {

        Swal.fire({
          title: "<h1 style='color:red'>Please fill all details</h1>",
          icon: 'error',

        })

      }

    })



  }

  checkBudgetCategoryNameExits(data: SubCategoryData): boolean {

    let budgetCategoryData = this.budgetCodeList;

    let isBudgetCategoryNameExits = false;

    for (let i = 0; i < budgetCategoryData.length; i++) {

      if (budgetCategoryData[i] == data.budgetCode) {

        isBudgetCategoryNameExits = true;

      }
    }

    return isBudgetCategoryNameExits;

  }


  back() {

    this.router.navigate([`/${AppConstant.BUDGETCATEGORYMASTER}`])

  }

  autogrow() {
    let textArea = document.getElementById("description")
    this.textArea.style.overflow = 'hidden';
    this.textArea.style.height = 'auto';
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
  }
  initBudgetCategotryNameList() {
    this.budgetCategoryService.getBudgetCategoryList().subscribe((res: any) => {
      this.budgetCategoryNameList = [];
      for (const item in res) {
        this.budgetCategoryNameList.push(res[item].budgetCategoryName);
      }
    })
    this.budgetCategoryNameSelected = this.budgetCategoryNameList
  }


  initBudgetCodeList() {
    this.budgetSubCategoryService.getActiveBudgetSubCategory().subscribe((res: any) => {
      this.budgetCodeList = [];
      for (const item in res) {
        this.budgetCodeList.push(res[item].budgetCode);
      }
    })
    // this.budgetCategoryNameSelected = this.budgetCategoryNameList
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


  selectedValues(event: any) {
    this.selectedType = event.target.value;
  }

  addBudgetCategory() {
    this.router.navigate([AppConstant.BUDGETCATEGORYMASTER]);
  }

  getActiveBudgetSubCategory() {
    this.budgetSubCategoryService.getActiveBudgetSubCategory().subscribe((data: any) => {
      this.budgetSubCategoryData = data;

    });
  }


  deleteCategory(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.budgetSubCategoryService.deleteSubCategory(data.id).subscribe((res: any) => {
      })
    alert('Record deleted Successfully')
    this.getActiveBudgetSubCategory()

  }
  editCategory(data: any, index: number) {
    this.editMode = true;
    this.editMode = true;
    console.log(data);
    console.log(this.budgetSubCategoryData[index]);
    this.editBudgetSubCategoryId = data;
    // console.log(this.budgetSubCategoryData[index])
    this.budgetSubCategoryMasterForm.setValue({
      budgetCategoryName: this.budgetSubCategoryData[index].budgetCategoryName,
      remark: this.budgetSubCategoryData[index].remark,
      status: this.budgetSubCategoryData[index].status,
      budgetSubCategoryName: this.budgetSubCategoryData[index].budgetSubCategoryName,
      budgetCode: this.budgetSubCategoryData[index].budgetCode,
      budgetType: this.budgetSubCategoryData[index].budgetType,
      // createdBy:this.budgetSubCategoryData[index].createdBy
    })
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
      length: this.budgetSubCategoryData.length
    });
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