import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { BudgetCreationData } from 'src/app/model/budget-creation/budget-creation.module';
import { BudgetCreationService } from '../../services/budget-creation.service';

@Component({
  selector: 'app-budget-category-master',
  templateUrl: './budget-category-master.component.html',
  styleUrls: ['./budget-category-master.component.scss']
})
export class BudgetCategoryMasterComponent {

  public budgetCategoryMasterForm !: FormGroup;


  constructor(private router: Router, private fb: FormBuilder,private budgetCategoryService: BudgetCreationService) { }

  textArea: any;

  ngOnInit() {

    this.initBudgetCategoryMasterForm();
  }


  initBudgetCategoryMasterForm() {

    this.budgetCategoryMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],
      'budgetDescription': ['', [Validators.minLength(4)]]
    });

  }


  budgetCategoryMaster() {
    let createBudgetCategoryRequest:BudgetCreationData={
      "budgetCategoryName": this.budgetCategoryMasterForm.value.budgetCategoryName,
      "budgetCategoryDescription": this.budgetCategoryMasterForm.value.budgetCategoryDescription
      
    };
    this.budgetCategoryService.createBudgetCategory(createBudgetCategoryRequest).subscribe((data:any)=>{
      
    })

    this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`])

  }

  autogrow() {
    let textArea = document.getElementById("description")
    this.textArea.style.overflow = 'hidden';
    this.textArea.style.height = 'auto';
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
  }

}

