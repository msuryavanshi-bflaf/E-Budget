import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-budget-category-master',
  templateUrl: './budget-category-master.component.html',
  styleUrls: ['./budget-category-master.component.scss']
})
export class BudgetCategoryMasterComponent {

    public budgetCategoryMasterForm !: FormGroup;
   
  
    constructor(private router: Router, private fb: FormBuilder) { }
  
  
    ngOnInit() {
  
      this.initBudgetCategoryMasterForm();
    }
  
  
    initBudgetCategoryMasterForm() {
  
      this.budgetCategoryMasterForm = this.fb.group({
  
        'budgetCategoryName': ['', [Validators.minLength(4)]],
        'budgetDescription':['',[Validators.minLength(4)]]
      });
  
    }
  
   
    budgetCategoryMaster() {
  
      this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`])
  
    }
  
  
  }
  
