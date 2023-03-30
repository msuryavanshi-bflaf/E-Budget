import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { BudgetCategoryData } from 'src/app/Model/budget-category/budget-category.module';
import Swal from 'sweetalert2';

import { BudgetCategoryService } from '../../services/budget-category.service';

@Component({
  selector: 'app-budget-category-master',
  templateUrl: './budget-category-master.component.html',
  styleUrls: ['./budget-category-master.component.scss']
})
export class BudgetCategoryMasterComponent {

  public budgetCategoryMasterForm !: FormGroup;
  showMsg: boolean = false;
  budgetCategoryNameList: String[] = undefined as any;

  constructor(private router: Router, private fb: FormBuilder, private budgetCategoryService: BudgetCategoryService) { }

  textArea: any;
  res: any;
  ngOnInit() {

    this.initBudgetCategoryMasterForm();
    this.initBudgetCategotryNameList()
  }

  initBudgetCategoryMasterForm() {

    this.budgetCategoryMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],
      'budgetCategoryDescription': ['', [Validators.minLength(4)]]
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

  budgetCategoryMaster() {
    let createBudgetCategoryRequest: BudgetCategoryData = {
      "budgetCategoryName": this.budgetCategoryMasterForm.value.budgetCategoryName,
      "budgetCategoryDescription": this.budgetCategoryMasterForm.value.budgetCategoryDescription

    };
    this.budgetCategoryService.createBudgetCategory(createBudgetCategoryRequest).subscribe((data: any) => {
      let StoredData = data.body;

      if (data.body.budgetCategoryName != "" && data.body.budgetCategoryDescription != "") {

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


}

