import { Component } from '@angular/core';
import { style } from '@angular/animations';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { BudgetCategoryData, BudgetCategoryDetails } from 'src/app/Model/budget-category/budget-creation.module';
import Swal from 'sweetalert2';

import { BudgetCategoryService } from '../../services/budget-category.service';


@Component({
  selector: 'app-edit-budget-category-master',
  templateUrl: './edit-budget-category-master.component.html',
  styleUrls: ['./edit-budget-category-master.component.scss']
})
export class EditBudgetCategoryMasterComponent {


  public budgetCategoryMasterForm !: FormGroup;
  showMsg: boolean = false;
  budgetCategoryNameList: String[] = undefined as any;
  checked = true;
  budgetCategoryData: BudgetCategoryDetails[] = [];

  constructor(private route: ActivatedRoute,private router: Router, private fb: FormBuilder, private budgetCategoryService: BudgetCategoryService) { }

  textArea: any;
  res: any;
  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      let id=Number(params.get('id'))
    })

    this.initBudgetCategoryMasterForm();
    this.initBudgetCategotryNameList()
  }

  getbudgetCategoryDetails() {
    this.budgetCategoryService.getAllBudgetCategoryList().subscribe((data: any) => {
      this.budgetCategoryData = data;
      
    });
  }

  initBudgetCategoryMasterForm() {

    this.budgetCategoryMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],
      'remark': ['', [Validators.minLength(4)]],
      'status':[''],
    });

  }

  initBudgetCategotryNameList() {
    this.budgetCategoryService.getBudgetCategoryList().subscribe((res) => {
      this.budgetCategoryNameList = [];
      for (const item in res) {
        this.budgetCategoryNameList.push(res[item].budgetCategoryName);
      }
    })
  }

  updatebudgetCategoryMaster() {
    let createBudgetCategoryRequest: BudgetCategoryData = {
      "budgetCategoryName": this.budgetCategoryMasterForm.value.budgetCategoryName,
      "remark": this.budgetCategoryMasterForm.value.remark,
"status":this.budgetCategoryMasterForm.value.status
    };
    this.budgetCategoryService.createBudgetCategory(createBudgetCategoryRequest).subscribe((data: any) => {
      let StoredData = data.body;

      if (data.body.budgetCategoryName != "" && data.body.remark != "") {

        let isBudgetCategoryNameExits = this.checkBudgetCategoryNameExits(StoredData);

        if (isBudgetCategoryNameExits == true) {

          alert('user already exits...')
          this.router.navigate([`/${AppConstant.BUDGETCATEGORYMASTER}`])

        } else {
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

  checkBudgetCategoryNameExits(data: BudgetCategoryData): boolean {

    let budgetCategoryData = this.budgetCategoryNameList;

    let isBudgetCategoryNameExits = false;

    for (let i = 0; i < budgetCategoryData.length; i++) {

      if (budgetCategoryData[i] == data.budgetCategoryName) {

        isBudgetCategoryNameExits = true;

      }
    }

    return isBudgetCategoryNameExits;

  }

  autogrow() {
    let textArea = document.getElementById("description")
    this.textArea.style.overflow = 'hidden';
    this.textArea.style.height = 'auto';
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
  }

  keyPressAlphanumeric(event: any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-z\d\-_\s]+$/i.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}


