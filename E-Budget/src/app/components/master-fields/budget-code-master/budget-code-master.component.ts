import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetCodeData } from 'src/app/Model/budet-code/budget-code.module';


@Component({
  selector: 'app-budget-code-master',
  templateUrl: './budget-code-master.component.html',
  styleUrls: ['./budget-code-master.component.scss']
})
export class BudgetCodeMasterComponent {

  public budgetCodeMasterForm !: FormGroup;
  showMsg: boolean = false;
  budgetCodeNameList: String[] = undefined as any;

  constructor(private router: Router, private fb: FormBuilder) { }

  textArea: any;
  res: any;
  ngOnInit() {

    this.initBudgetCodeMasterForm();
   
  }

  initBudgetCodeMasterForm() {

    this.budgetCodeMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],
      'budgetCategoryDescription': ['', [Validators.minLength(4)]]
    });

  }

  
  budgetCodeMaster() {
    let createBudgetCategoryRequest: BudgetCodeData = {
      "budgetCode": this.budgetCodeMasterForm.value.budgetCode,
      "budgetCategoryName": this.budgetCodeMasterForm.value.budgetCategoryName,
      "budgetCategoryDescription": this.budgetCodeMasterForm.value.budgetCategoryDescription

    };
  
}

autogrow() {
  let textArea = document.getElementById("description")
  this.textArea.style.overflow = 'hidden';
  this.textArea.style.height = 'auto';
  this.textArea.style.height = this.textArea.scrollHeight + 'px';
}

}
