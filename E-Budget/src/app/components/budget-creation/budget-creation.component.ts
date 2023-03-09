
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';


@Component({

  selector: 'app-budget-creation',
  templateUrl: './budget-creation.component.html',
  styleUrls: ['./budget-creation.component.scss']

})

export class BudgetCreationComponent {


  public createBudgetForm !: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { }


  ngOnInit() {

    this.initCreateBudgetForm();
  }


  initCreateBudgetForm() {

    this.createBudgetForm = this.fb.group({

      'budgetCode': ['', [Validators.minLength(4)]],

      'budgetType': ['', [Validators.minLength(4)]],

      'budgetDescription': ['', Validators.minLength(10)],

      'amount': ['', [Validators.minLength(8), Validators.maxLength(15)]],

      'createdBy': ['', [Validators.minLength(4)]],

      'createdDate': [''],

      'modifyBy': ['', [Validators.minLength(4)]],

      'modifyDate': [''],

      'remark': ['']
    });

  }

  budgetCreation() {

    this.router.navigate([`/${AppConstant.GENERATEPO}`])

  }


}


