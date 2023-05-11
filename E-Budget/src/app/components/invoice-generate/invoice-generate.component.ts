
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';

import { AppConstant } from 'src/app/constants/app.constants';
import { Messages } from 'src/app/constants/message.constants';
import { InvoiceData } from 'src/app/Model/invoice/invoice.module';
import { InvoiceService } from 'src/app/components/services/invoice.service';
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
   invoiceData: InvoiceData[] = [];
  // invoiceData:any;
 
  sendMail: any = ['Yes', 'No'];
  selectedValue: any;
  tableHead = ['invoiceNumber', 'poNumber','invoiceAmount', 'tax','invoiceDate','invoiceReceivedDate', 'remark'];

  constructor(private router: Router, private fb: FormBuilder,private invoiceService:InvoiceService) { }

  ngOnInit() {

    this.initGenerateInvoiceForm();
    this.initInvoiceData();
   
  }


  initGenerateInvoiceForm() {

    this.generateInvoiceForm = this.fb.group({

      'poNumber': ['', [Validators.minLength(4)]],

      'invoiceNumber': ['', [Validators.minLength(4)]],

      'invoiceDate': [''],

      'invoiceReceivedDate': [''],

      'invoiceAmount': [''],

      'remark': [''],
      
      'tax': [''],

      'sendEmail':[''],

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

    let createInvoice: InvoiceData = {
     
      "id": this.generateInvoiceForm.value.id,
      "poNumber": this.generateInvoiceForm.value.poNumber,
      "invoiceNumber": this.generateInvoiceForm.value.invoiceNumber,
      "invoiceDate": this.generateInvoiceForm.value.invoiceDate,
      "invoiceAmount": this.generateInvoiceForm.value.invoiceAmount,
      "invoiceReceivedDate": this.generateInvoiceForm.value.invoiceReceivedDate,
      "tax":this.generateInvoiceForm.value.tax,
      "remark":this.generateInvoiceForm.value.remark,
      "sendEmail":this.generateInvoiceForm.value.sendEmail,
    };
    this.invoiceService.generateInvoice(createInvoice).subscribe((data: any) => {
    //  this.lastElement=this.lastElement-data.body.poAmount;
    
    //  console.log("minus recent amount into availabe amount",this.lastElement)
    // if(data.body.poDate > data.body.poExpiryDate)
    // {
      // Swal.fire({
      //   title: "<h1 style='color:success'>Invoice Generate dSuccessfully</h1>",
      //   icon: 'success',
      // })
    //   this.router.navigate([`/${AppConstant.GENERATEPO}`])
    // }
    // else
    this.router.navigate([`/${AppConstant.GENERATEINVOICE}`])
    })
    
  }

  initInvoiceData(){
    this.invoiceService.getInvoiceList().subscribe((data: any) => {
      this.invoiceData = data;
    });
  }
}
