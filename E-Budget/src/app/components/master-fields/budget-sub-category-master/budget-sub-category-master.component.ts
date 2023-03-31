import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { SubCategoryData } from 'src/app/Model/sub-category/sub-category.module';
import Swal from 'sweetalert2';
import { FindAllBudgetCategoryNameService } from '../../services/find-all-budget-category-name.service';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-budget-sub-category-master',
  templateUrl: './budget-sub-category-master.component.html',
  styleUrls: ['./budget-sub-category-master.component.scss']
})
export class BudgetSubCategoryMasterComponent {

  public budgetSubCategoryMasterForm !: FormGroup;
  budgetCategoryNameList: String[] = undefined as any;
  selectedTeam = '';
  textArea: any;
  selectedValue: any;
  constructor(private router: Router, private fb: FormBuilder, private SubCategoryService: SubCategoryService, private FindAllBudgetCategoryNameService: FindAllBudgetCategoryNameService) { }
  budgetCategoryNameSelected: any

  ngOnInit() {

    this.initBudgetSubCategoryMasterForm();
    this.initBudgetCategotryNameList();

  }


  initBudgetSubCategoryMasterForm() {

    this.budgetSubCategoryMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],

      'budgetSubCategoryName': ['', [Validators.minLength(4)]],

      'remark': ['', Validators.minLength(4)],

      'budgetCode': [''],

      'active': ['']
    });

  }
  budgetSubCategoryMaster() {

    let createSubCategoryRequest: SubCategoryData = {
      "budgetCategoryName": this.budgetSubCategoryMasterForm.value.budgetCategoryName,
      "budgetSubCategoryName": this.budgetSubCategoryMasterForm.value.budgetSubCategoryName,
      "remark": this.budgetSubCategoryMasterForm.value.remark,
      "budgetCode": this.budgetSubCategoryMasterForm.value.budgetCode,
      "active": this.budgetSubCategoryMasterForm.value.active
    };
    this.SubCategoryService.createSubCategory(createSubCategoryRequest).subscribe((data: any) => {
      if (data.body.budgetCode != "" && data.body.budgetSubCategoryName != "") {

        this.router.navigate([`/${AppConstant.VENDORMASTER}`])
        Swal.fire('Budget SubCategory added successfully')

      }

      else {

        Swal.fire({
          title: "<h1 style='color:red'>Please fill all details</h1>",
          icon: 'error',

        })

      }
    })



  }

  autogrow() {
    let textArea = document.getElementById("description")
    this.textArea.style.overflow = 'hidden';
    this.textArea.style.height = 'auto';
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
  }
  initBudgetCategotryNameList() {
    this.FindAllBudgetCategoryNameService.getBudgetCategoryList().subscribe((res: any) => {
      this.budgetCategoryNameList = [];
      for (const item in res) {
        this.budgetCategoryNameList.push(res[item].budgetCategoryName);
      }
    })
    this.budgetCategoryNameSelected = this.budgetCategoryNameList
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


  onSelected(value: string): void {
    this.selectedTeam = value;
  }
}


