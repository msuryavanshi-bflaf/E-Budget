import { Component } from '@angular/core';
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
  styleUrls: ['./budget-creation.component.scss']
})


export class BudgetCreationComponent  {
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
      'budgetCode':['',[Validators.minLength(4)]],
      'capitalAmount':[''],
      'revenueAmount':[''],
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
      "amount":this.createBudgetCreationForm.value.capitalAmount,
      "amountInWords":this.createBudgetCreationForm.value.revenueAmount,
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
  }
  initBudgetSubCategotryNameList(){
    this.subCategoryService.getActiveBudgetSubCategory().subscribe((res:any)=>{
      this.budgetSubCategoryNameList =[];
      for(const item in res){
        this.budgetSubCategoryNameList.push(res[item].budgetSubCategoryName);
      }
    })
  }

  initBudgetCodeList(){
    this.subCategoryService.getBudgetCodeList().subscribe((res:any)=>{
      this.budgetCodeList =[];
      for(const item in res){
        this.budgetCodeList.push(res[item].budgetCode);
      }
    })
  }

  initBudgetType(){
    this.subCategoryService.getBudgetType()
      
  }

}
