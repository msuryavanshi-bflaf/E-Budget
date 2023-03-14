import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-budget-sub-category-master',
  templateUrl: './budget-sub-category-master.component.html',
  styleUrls: ['./budget-sub-category-master.component.scss']
})
export class BudgetSubCategoryMasterComponent {

  public budgetSubCategoryMasterForm !: FormGroup;
  textArea: any;

  constructor(private router: Router, private fb: FormBuilder) { }


  ngOnInit() {

    this.initBudgetSubCategoryMasterForm();
  }


  initBudgetSubCategoryMasterForm() {

    this.budgetSubCategoryMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],

      'remark': ['', [Validators.minLength(4)]],

      'budgetDescription': ['', Validators.minLength(4)]

    });

  }



  budgetSubCategoryMaster() {

    this.router.navigate([`/${AppConstant.VENDORMASTER}`])

  }
  autogrow() {
    let textArea = document.getElementById("description")
    this.textArea.style.overflow = 'hidden';
    this.textArea.style.height = 'auto';
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
  }

}


