import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxNumToWordsService, SUPPORTED_LANGUAGE } from 'ngx-num-to-words';
import { AppConstant } from 'src/app/constants/app.constants';
import { NumberValidation } from 'src/app/data/utils/number.util';
import { BudgetCreation } from 'src/app/Model/budget-creation/budget-creation.module';
import { BudgetCategoryService } from '../services/budget-category.service';
import { BudgetCreationService } from '../services/budget-creation.service';
import { SubCategoryService } from '../services/sub-category.service';

@Component({
  selector: 'app-budget-creation',
  templateUrl: './budget-creation.component.html',
  styleUrls: ['./budget-creation.component.scss'],
})


export class BudgetCreationComponent implements PipeTransform  {

  transform(value: any, args?: any): any {
    if (value) {
      value = parseFloat(value).toFixed(2);

      let amounth = value.toString().split(".");
      let price: any = amounth[0];
      let pointer: any = amounth.length > 0 ? amounth[1] : null;
      var singleDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
        doubleDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
        tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
        handle_tens = function (digit: any, prevdigit: any) {
          return 0 == digit ? "" : " " + (1 == digit ? doubleDigit[prevdigit] : tensPlace[digit])
        },
        handle_utlc = function (digit: any, nextdigit: any, denom: any) {
          return (0 != digit && 1 != nextdigit ? " " + singleDigit[digit] : "") + (0 != nextdigit || digit > 0 ? " " + denom : "")
        };
      var rupees = "",
        digitIndex = 0,
        digit = 0,
        nextDigit = 0,
        words = [],
        paisaWords = [],
        paisa = "";
      if (price += "", isNaN(parseFloat(price))) rupees = "";
      else if (parseFloat(price) > 0 && price.length <= 10) {
        for (digitIndex = price.length - 1; digitIndex >= 0; digitIndex--)
          switch (digit = price[digitIndex] - 0, nextDigit = digitIndex > 0 ? price[digitIndex - 1] - 0 : 0, price.length - digitIndex - 1) {
            case 0:
              words.push(handle_utlc(digit, nextDigit, ""));
              break;
            case 1:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 2:
              words.push(0 != digit ? " " + singleDigit[digit] + " Hundred" + (0 != price[digitIndex + 1] && 0 != price[digitIndex + 2] ? " and" : "") : "");
              break;
            case 3:
              words.push(handle_utlc(digit, nextDigit, "Thousand"));
              break;
            case 4:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 5:
              words.push(handle_utlc(digit, nextDigit, "Lakh"));
              break;
            case 6:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 7:
              words.push(handle_utlc(digit, nextDigit, "Crore"));
              break;
            case 8:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 9:
              words.push(0 != digit ? " " + singleDigit[digit] + " Hundred" + (0 != price[digitIndex + 1] || 0 != price[digitIndex + 2] ? " and" : " Crore") : "")
          }
        rupees = words.reverse().join("")
      } else rupees = "";
      if (rupees)
        rupees = `${rupees} Rupees`
      if (pointer != "00") {
        digitIndex = 0;
        digit = 0;
        nextDigit = 0;
        for (digitIndex = pointer.length - 1; digitIndex >= 0; digitIndex--)
          switch (digit = pointer[digitIndex] - 0, nextDigit = digitIndex > 0 ? pointer[digitIndex - 1] - 0 : 0, pointer.length - digitIndex - 1) {
            case 0:
              paisaWords.push(handle_utlc(digit, nextDigit, ""));
              break;
            case 1:
              paisaWords.push(handle_tens(digit, pointer[digitIndex + 1]));
              break;
          }
        paisa = paisaWords.reverse().join("");
        if (rupees)
          rupees = `${rupees} and ${paisa} Paisa`
        else
          rupees = `${paisa} Paisa`
      }
      return rupees
    }
  }
  selectedTeam = '';
  public createBudgetCreationForm !: FormGroup;
  hide: boolean = true;
  //attachment
  attachResume: File | undefined;
  isValidFile: boolean = false;
  isValidFileError: boolean = false;
  fileName: string = "";
  attachmentErrorMessage: string = "";
  // budgetCategoryDescriptionList:String[]=undefined as any;
  budgetCategoryNameList:String[]=undefined as any;
  budgetSubCategoryNameList:String[]=undefined as any;
  budgetCodeList:String[]=undefined as any;
  numberInWords!: string;
  lang: SUPPORTED_LANGUAGE = 'en';
  // amountValue: number = 0;
  amounth: any;
  budgetCodeSelected: any;
  budgetSubCategoryNameSelected: any;
  budgetCategoryNameSelected: any;
  mynumber: number = 0;
  outputWords: any = "";
  require: any;
  
  
  constructor(private ngxNumToWordsService: NgxNumToWordsService,private router: Router, private fb: FormBuilder,private subCategoryService:SubCategoryService,private budgetCreationService:BudgetCreationService,private budgetCategoryService:BudgetCategoryService) { }

  ngOnInit(): void  {
    
    this.initCreateBudgetCreationForm();
    this.initBudgetCategotryNameList();
    this.initBudgetSubCategotryNameList();
    this.initBudgetCodeList();
    this.initBudgetType();
    // this.numberInWords = this.ngxNumToWordsService.inWords(this.amountValue, this.lang);
  }
  
  // numToWord(num: { value: number; }){
  //   console.log(num.value);
  //   this.value=num.value;
  //   this.numberInWords = this.ngxNumToWordsService.inWords(this.value, this.lang);

  // }

  initCreateBudgetCreationForm() {
    this.createBudgetCreationForm = this.fb.group({
      
      'budgetCategoryName': ['', [Validators.minLength(4)]],
      'budgetSubCategoryName': ['', [Validators.minLength(4)]],
      'budgetCode': ['', [Validators.minLength(4)]],
      'amount': [''],
      'amountInWords': [''],
      'budgetType': [''],
      'createdBy': ['', [Validators.minLength(4)]],
      'createdDate': ['',[Validators.required]],
      'modifyBy': ['', [Validators.minLength(4)]],
      'modifyDate': [''],
      'remark': ['']
      
    });
  }

  validateNumber(event: { which: any; keyCode: any; }): boolean {
    return NumberValidation.validateNumber(event);
  }

  budgetCreation() {

    let createBudgetRequest:BudgetCreation={
      "budgetCategoryName":this.createBudgetCreationForm.value.budgetCategoryName,
      "budgetSubCategoryName":this.createBudgetCreationForm.value.budgetSubCategoryName,
      "budgetCode":this.createBudgetCreationForm.value.budgetCode,
      "budgetType":this.createBudgetCreationForm.value.budgetType,
      "amount":this.createBudgetCreationForm.value.amount,
      "amountInWords":this.createBudgetCreationForm.value.amountInWords,
      "remark" :this.createBudgetCreationForm.value.remark
      

    };
    this.budgetCreationService.createBudget(createBudgetRequest).subscribe((data:any)=>{
      
    })
    this.router.navigate([`/${AppConstant.GENERATEPO}`])

  }

  initBudgetCategotryNameList(){
    this.budgetCategoryService.getBudgetCategoryList().subscribe((res:any)=>{
      this.budgetCategoryNameList =[];
      for(const item in res){
        this.budgetCategoryNameList.push(res[item].budgetCategoryName);
      }
    })
    this.budgetCategoryNameSelected = this.budgetCategoryNameList
  }
  initBudgetSubCategotryNameList(){
    this.subCategoryService.getActiveBudgetSubCategory().subscribe((res:any)=>{
      this.budgetSubCategoryNameList =[];
      for(const item in res){
        this.budgetSubCategoryNameList.push(res[item].budgetSubCategoryName);
      }
    })
    this.budgetCategoryNameSelected = this.budgetCategoryNameList
  }

  initBudgetCodeList(){
    this.subCategoryService.getBudgetCodeList().subscribe((res:any)=>{
      this.budgetCodeList =[];
      console.log("qeweqweqwe",this.budgetCodeList);
      for(const item in res){
        this.budgetCodeList.push(res[item].budgetCode);
    
      }
    })
    this.budgetCodeSelected = this.budgetCodeList
  }

  initBudgetType(){
    this.subCategoryService.getBudgetType()
      
  }

}
