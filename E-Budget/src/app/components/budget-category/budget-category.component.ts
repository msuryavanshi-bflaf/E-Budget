import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { NumberValidation } from 'src/app/data/utils/number.util';

@Component({
  selector: 'app-budget-category',
  templateUrl: './budget-category.component.html',
  styleUrls: ['./budget-category.component.scss']
})
export class BudgetCategoryComponent {

  public createBudgetCategoryForm !: FormGroup;
  hide: boolean = true;
  //attachment
  attachResume: File | undefined;
  isValidFile: boolean = false;
  isValidFileError: boolean = false;
  fileName: string = "";
  attachmentErrorMessage: string = "";

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.initCreateBudgetCategoryForm();
  }

  initCreateBudgetCategoryForm() {
    this.createBudgetCategoryForm = this.fb.group({
      'budgetCategoryName': ['', [Validators.minLength(4)]],
      'budgetSubCategoryName': ['', [Validators.minLength(4)]],
      'budgetDescription': ['', [Validators.minLength(40)]],
      'vendorName': ['', [Validators.minLength(4)]],
      'createdBy': ['', [Validators.minLength(4)]],
      'createdDate': [''],
      'modifyBy': ['', [Validators.minLength(4)]],
      'modifyDate': [''],
      'email': ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'mobileNumber': ['', Validators.minLength(10)],
      'remark': ['']
    });
  }

  validateNumber(event: { which: any; keyCode: any; }): boolean {
    return NumberValidation.validateNumber(event);
  }

  budgetCategory() {
    this.router.navigate([`/${AppConstant.BUDGETCREATION}`])
  }

}
