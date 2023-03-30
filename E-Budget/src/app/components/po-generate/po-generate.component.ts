import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { AppConstant } from 'src/app/constants/app.constants';
import { Messages } from 'src/app/constants/message.constants';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-po-generate',
  templateUrl: './po-generate.component.html',
  styleUrls: ['./po-generate.component.scss']
})
export class PoGenerateComponent {

  public generatePOForm !: FormGroup;
  //attachment
  attachFile: File | undefined;
  isValidFile: boolean = false;
  isValidFileError: boolean = false;
  fileName: string = "";
  attachmentErrorMessage: string = "";
  vendorNameList: String[] = undefined as any;
  constructor(private router: Router, private fb: FormBuilder, private vendorService: VendorService) { }


  ngOnInit() {

    this.initGeneratePOForm();
    this.initVendorNameList();
  }


  initGeneratePOForm() {

    this.generatePOForm = this.fb.group({

      'poNumber': ['', [Validators.minLength(4)]],

      'budgetCode': ['', [Validators.minLength(4)]],

      'poStage': ['', Validators.required],

      'vendorName': ['', [Validators.minLength(4)]],

      'createdBy': ['', [Validators.minLength(4)]],

      'createdDate': ['', [Validators.required]],

      'poAmount': [''],

      'modifyBy': ['', [Validators.minLength(4)]],

      'modifyDate': [''],

      'remark': [''],

      'file': ['', [Validators.required]],

      'poDescription': ['', [Validators.minLength(4)]],

      'poExpiryDate': ['', [Validators.required]]

    });

  }
  readFile(fileEvent: any) {
    this.attachFile = fileEvent.target.files[0];

    if (this.attachFile != undefined) {
      if (this.validateFile(this.attachFile)) {
        this.fileName = this.attachFile.name;
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

  validateFile(file: File) {
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
    this.attachFile?.slice;
    this.isValidFile = false;
  }

  initVendorNameList() {
    this.vendorService.getVendorNameList().subscribe((res: any) => {
      this.vendorNameList = [];
      for (const item in res) {
        this.vendorNameList.push(res[item].vendorName);
      }
    })
  }


  generatePO() {

    this.router.navigate([`/${AppConstant.GENERATEINVOICE}`])

  }


}
