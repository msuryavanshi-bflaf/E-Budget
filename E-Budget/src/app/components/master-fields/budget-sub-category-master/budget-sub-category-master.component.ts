import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  selectedTeam = '';
  textArea: any;
  constructor(private router: Router, private budgetCategoryService: BudgetCategoryService, private fb: FormBuilder, private SubCategoryService: SubCategoryService) { }


  ngOnInit() {

    this.initBudgetSubCategoryMasterForm();
    this.initBudgetCategotryNameList();
  }


  initBudgetSubCategoryMasterForm() {

    this.budgetSubCategoryMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],

      'budgetSubCategoryName': ['', [Validators.minLength(4)]],

      'budgetSubCategoryDescription': ['', Validators.minLength(4)]

    });

  }



  budgetSubCategoryMaster() {

    let createSubCategoryRequest: SubCategoryData = {
      "budgetCategoryName":this.budgetSubCategoryMasterForm.value.budgetCategoryName,
      "budgetSubCategoryName":this.budgetSubCategoryMasterForm.value.budgetSubCategoryName,
      "budgetSubCategoryDescription" :this.budgetSubCategoryMasterForm.value.budgetSubCategoryDescription
     
      
    };
    this.SubCategoryService.createSubCategory(createSubCategoryRequest).subscribe((data: any) => {

    })

    this.router.navigate([`/${AppConstant.VENDORMASTER}`])
    Swal.fire('Budget SubCategory added successfully')

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
  }





  onSelected(value: string): void {
    this.selectedTeam = value;
  }
}


