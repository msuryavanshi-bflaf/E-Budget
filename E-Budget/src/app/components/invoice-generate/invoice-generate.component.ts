
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';

import { AppConstant } from 'src/app/constants/app.constants';
import { Messages } from 'src/app/constants/message.constants';

@Component({
  selector: 'app-invoice-generate',
  templateUrl: './invoice-generate.component.html',
  styleUrls: ['./invoice-generate.component.scss']
})
export class InvoiceGenerateComponent {

  public generateInvoiceForm !: FormGroup;
  hide: boolean = true;
  //attachment
  attachResume: File | undefined;
  isValidFile: boolean = false;
  isValidFileError: boolean = false;
  fileName: string = "";
  attachmentErrorMessage: string = "";


  constructor(private router: Router, private fb: FormBuilder) { }


  ngOnInit() {

    this.initGenerateInvoiceForm();
  }


  initGenerateInvoiceForm() {

    this.generateInvoiceForm = this.fb.group({

      'poNumber': ['', [Validators.minLength(4)]],

      'invoiceNumber': ['', [Validators.minLength(4)]],

      'invoiceDate': [''],

      'createdBy': ['', [Validators.minLength(4)]],

      'invoiceAmount': [''],

      'modifyBy': ['', [Validators.minLength(4)]],

      'modifyDate': [''],

      'remark': ['']




    });

  }

  readFile(fileEvent: any) {
    this.attachResume = fileEvent.target.files[0];

    if (this.attachResume != undefined) {
      if (this.validateResume(this.attachResume)) {
        this.fileName = this.attachResume.name;
        this.isValidFile = true;
        this.isValidFileError = false;
      } else {
        this.isValidFile = false;
        this.isValidFileError = true;
      }
    } else {
      this.isValidFile = false;
      this.isValidFileError = true;
      this.attachmentErrorMessage = Messages.SUPPORTED_FILE_EXTENSIONS;
    }
  }

  validateResume(file: File) {
    const fileExtension = file.name.split('.').pop();
    console.log("attachResume extensions : " + fileExtension);
    console.log("attachResume size : " + file.size);

    if (fileExtension != undefined && !AppConfig.FILE_EXTENSION.includes(fileExtension)) {
      this.attachmentErrorMessage = Messages.SUPPORTED_FILE_EXTENSIONS;
      return false;
    } else if (file.size > AppConfig.FILE_SIZE) {
      this.attachmentErrorMessage = Messages.SUPPORTED_FILE_SIZE;
      return false;
    } else {
      return true;
    }
  }

  removeSelectedFile() {
    this.attachResume?.slice;
    this.isValidFile = false;
  }


  generateInvoice() {

    this.router.navigate([`/${AppConstant.GENERATEINVOICE}`])

  }


}
