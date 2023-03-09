import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AppConstant } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-po-generate',
  templateUrl: './po-generate.component.html',
  styleUrls: ['./po-generate.component.scss']
})
export class PoGenerateComponent {

  public generatePOForm !: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { }


  ngOnInit() {

    this.initGeneratePOForm();
  }


  initGeneratePOForm() {

    this.generatePOForm = this.fb.group({

      'poNumber': ['', [Validators.minLength(4)]],

      'budgetCode': ['', [Validators.minLength(4)]],

      'poStatus': ['', Validators.required],

      'vendorName': ['', [Validators.minLength(4), Validators.maxLength(15)]],

      'createdBy': ['', [Validators.minLength(4)]],

      'poAmount': [''],

      'modifyBy': ['', [Validators.minLength(4)]],

      'modifyDate': [''],

      'remark': [''],

      'crDescription':['',[Validators.minLength(5)]],

      'poExpiryDate':['',[Validators.required]]

    });

  }

  generatePO() {

    this.router.navigate([`/${AppConstant.GENERATEINVOICE}`])

  }


}
