import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { NumberValidation } from 'src/app/data/utils/number.util';
import { BudgetCreation } from 'src/app/Model/budget-category/budget-creation.module';
import { BudgetCreationService } from '../services/budget-creation.service';
import { FindAllBudgetCategoryNameService } from '../services/find-all-budget-category-name.service';
import { FindAllBudgetDescriptionService } from '../services/find-all-budget-description.service';

@Component({
  selector: 'app-budget-creation',
  templateUrl: './budget-creation.component.html',
  styleUrls: ['./budget-creation.component.scss']
})
export class BudgetCreationComponent {

  public createBudgetCreationForm !: FormGroup;
  hide: boolean = true;
  //attachment
  attachResume: File | undefined;
  isValidFile: boolean = false;
  isValidFileError: boolean = false;
  fileName: string = "";
  attachmentErrorMessage: string = "";
  budgetCategoryDescriptionList:String[]=undefined as any;
  budgetCategoryNameList:String[]=undefined as any;

  constructor(private router: Router, private fb: FormBuilder,private BudgetCreationService:BudgetCreationService,private FindAllBudgetCategoryNameService:FindAllBudgetCategoryNameService) { }

  ngOnInit() {
    this.initCreateBudgetCreationForm();
    this.initBudgetCategotryDescriptionList();
  }

  initCreateBudgetCreationForm() {
    this.createBudgetCreationForm = this.fb.group({
      'budgetCategoryName': ['', [Validators.minLength(4)]],
      'budgetSubCategoryName': ['', [Validators.minLength(4)]],
      'budgetCategoryDescription': [''],
      'vendorName': ['', [Validators.minLength(4)]],
      'createdBy': ['', [Validators.minLength(4)]],
      'createdDate': ['',[Validators.required]],
      'modifyBy': ['', [Validators.minLength(4)]],
      'modifyDate': [''],
      'email': ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'mobileNumber': ['', Validators.minLength(10)],
      'remark': [''],
      'amount':['']
    });
  }

  validateNumber(event: { which: any; keyCode: any; }): boolean {
    return NumberValidation.validateNumber(event);
  }

  budgetCreation() {

    let createBudgetRequest:BudgetCreation={
      "amount":this.createBudgetCreationForm.value.amount,
      "remark" :this.createBudgetCreationForm.value.remark,
      "budgetCategoryDescription":this.createBudgetCreationForm.value.budgetCategoryNameList.budgetCategoryDescription,

    };
    this.BudgetCreationService.createBudget(createBudgetRequest).subscribe((data:any)=>{
      
    })
    this.router.navigate([`/${AppConstant.GENERATEPO}`])

  }

  initBudgetCategotryDescriptionList(){
    this.FindAllBudgetCategoryNameService.getBudgetCategoryList().subscribe((res:any)=>{
      this.budgetCategoryNameList =[];
      for(const item in res){
        this.budgetCategoryNameList.push(res[item].budgetCategoryDescription);
      }
    })
  }







}
