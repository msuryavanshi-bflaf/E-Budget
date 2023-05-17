import { Component, Pipe } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATEPICKER_VALIDATORS } from '@angular/material/datepicker';
import { PageEvent } from '@angular/material/paginator';

import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { AppConstant } from 'src/app/constants/app.constants';
import { Messages } from 'src/app/constants/message.constants';
import {
  POData,
  poDetails,
} from 'src/app/Model/po-generation/po-generation.module';
import Swal from 'sweetalert2';
import { BudgetCreationService } from '../services/budget-creation.service';
import { PoService } from '../services/po.service';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-po-generate',
  templateUrl: './po-generate.component.html',
  styleUrls: ['./po-generate.component.scss'],
  providers: [Pipe],
})
export class PoGenerateComponent {
  public generatePOForm!: FormGroup;
  //attachment
  attachFile: File | undefined;
  isValidFile: boolean = false;
  isValidFileError: boolean = false;
  fileName: string = '';
  attachmentErrorMessage: string = '';
  vendorNameList: String[] = undefined as any;
  budgetCreationList: String[] = undefined as any;
  vendorNameSelected: any;
  poStageSelected: any;
  formBuilder: any;
  poDate: any;
  balance: String = '                     Last Balance';
  updatedBalance: String = '  /';
  amountSelected: any;
  lastElement: any;
  myArr: any;
  updatedAmount: any;
  tableHead = [
    'PO Stage',
    'PO Number',
    'Budget Code',
    'Vendor Name',
    'PO Date',
    'PO Expiry Date',
  ];
  poData: poDetails[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private vendorService: VendorService,
    private poService: PoService,
    private budgetCreationService: BudgetCreationService
  ) {}

  ngOnInit() {
    this.initGeneratePOForm();
    this.initVendorNameList();
    this.initPOList();
    this.initAmountList();
  }

  initGeneratePOForm() {
    this.generatePOForm = this.fb.group({
      poNumber: ['', [Validators.minLength(4)]],

      budgetCode: ['', [Validators.minLength(4)]],

      poStage: ['', Validators.required],

      vendorCompanyName: ['', [Validators.minLength(4)]],

      poAmount: [''],

      poDescription: ['', [Validators.minLength(4)]],

      poDate: ['', [Validators.required]],

      poExpiryDate: [''],

      modifyBy: ['', [Validators.minLength(4)]],

      modifyDate: [''],

      file: ['', [Validators.required]],

      createdBy: ['', [Validators.minLength(4)]],

      createdDate: ['', [Validators.required]],
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
    console.log('attachResume extensions : ' + fileExtension);
    console.log('attachResume size : ' + file.size);

    if (
      fileExtension != undefined &&
      !AppConfig.FILE_EXTENSION.includes(fileExtension)
    ) {
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
    this.vendorService.getActiveVendor().subscribe((res: any) => {
      this.vendorNameList = [];
      for (const item in res) {
        this.vendorNameList.push(res[item].vendorCompanyName);
      }
    });
    this.vendorNameSelected = this.vendorNameList;
  }

  initAmountList() {
    this.budgetCreationService.getBudgetCreation().subscribe((res: any) => {
      this.budgetCreationList = [];

      for (const item in res) {
        this.budgetCreationList.push(res[item].amount);
      }
      this.myArr = this.budgetCreationList;
      this.lastElement = this.myArr[this.myArr.length - 1];
      console.log('arrr logic', this.lastElement);
    });
    this.amountSelected = this.budgetCreationList[1];
  }

  initPOList() {
    this.poService.getPOList().subscribe((data: any) => {
      this.poData = data;
    });
  }

  generatePO() {
    let createPORequest: POData = {
      id: this.generatePOForm.value.id,
      poNumber: this.generatePOForm.value.poNumber,
      budgetCode: this.generatePOForm.value.budgetCode,
      poStage: this.generatePOForm.value.poStage,
      vendorCompanyName: this.generatePOForm.value.vendorCompanyName,
      poDescription: this.generatePOForm.value.poDescription,
      poExpiryDate: this.generatePOForm.value.poExpiryDate,
      poDate: this.generatePOForm.value.poDate,
      poAmount: this.generatePOForm.value.poAmount,
    };
    this.poService.generatepo(createPORequest).subscribe((data: any) => {
      this.lastElement = this.lastElement - data.body.poAmount;

      console.log('minus recent amount into availabe amount', this.lastElement);
 
    
      if( data.body.poNumber != '' &&
          data.body.remark != '' &&
          data.body.budgetSubCategoryName != '' &&
          data.body.budgetCode != '' &&
          data.body.poStage != '' &&
          data.body.vendorCompanyName != '' &&
          data.body.poDescription != '' &&
          data.body.poAmount != '' 
          )
    {
      if(data.body.poDate > data.body.poExpiryDate)
{
      Swal.fire({
        title: "<h1 style='color:red'>PO Expiry date should be greater than PO Date</h1>",
        icon: 'error',

      })
      this.router.navigate([`/${AppConstant.GENERATEPO}`])
      }
      else
    Swal.fire({
      title: "<h1 style='color:green'>PO Generated successfully</h1>",
      icon: 'success',

    })
    this.router.navigate([`/${AppConstant.GENERATEINVOICE}`])
    }

    else
    Swal.fire({
      title: "<h1 style='color:red'>Please fill all fields.</h1>",
      icon: 'error',

    })
    this.router.navigate([`/${AppConstant.GENERATEPO}`])
    })
    
  }

  onKeyUp(event: any) {
    this.updatedAmount = this.generatePOForm.value.poAmount - this.lastElement;
  }

  
  back() {
    this.router.navigate([`/${AppConstant.BUDGETCREATION}`]);
  }

}
