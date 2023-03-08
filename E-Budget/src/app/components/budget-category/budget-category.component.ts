import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AppConfig } from 'src/app/config/app.config';
import { AppConstant } from 'src/app/constants/app.constants';
// import { Messages } from 'src/app/constants/message.constants';
// import { NumberValidation } from 'src/app/data/utils/number.util';

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
      'remark':['']
    });
  }

  // validateNumber(event: { which: any; keyCode: any; }): boolean {
  //   // return NumberValidation.validateNumber(event);
  // }

  // readFile(fileEvent: any) {
  //   this.attachResume = fileEvent.target.files[0];

  //   if (this.attachResume != undefined) {
  //     if () {
  //       this.fileName = this.attachResume.name;
  //       this.isValidFile = true;
  //       this.isValidFileError = false;
  //     } else {
  //       this.isValidFile = false;
  //       this.isValidFileError = true;
  //     }
  //   } else {
  //     this.isValidFile = false;
  //     this.isValidFileError = true;
  //     // this.attachmentErrorMessage = Messages.SUPPORTED_FILE_EXTENSIONS;
  //   }
  // }

  validateResume(file: File) {
    const fileExtension = file.name.split('.').pop();
    console.log("attachResume extensions : " + fileExtension);
    console.log("attachResume size : " + file.size);

    // if (fileExtension != undefined && !AppConfig.FILE_EXTENSION.includes(fileExtension)) {
    //   this.attachmentErrorMessage = Messages.SUPPORTED_FILE_EXTENSIONS;
    //   return false;
    // } else if (file.size > AppConfig.FILE_SIZE) {
    //   this.attachmentErrorMessage = Messages.SUPPORTED_FILE_SIZE;
    //   return false;
    // } else {
    //   return true;
    // }
  }

  removeSelectedFile() {
    this.attachResume?.slice;
    this.isValidFile = false;
  }

  budgetCategory() {
    this.router.navigate([`/${AppConstant.BUDGETCATEGORY}`])
  }

}
