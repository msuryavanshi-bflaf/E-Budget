import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetCodeData } from 'src/app/Model/budet-code/budget-code.module';
import { FindAllBudgetCategoryNameService } from '../../services/find-all-budget-category-name.service';
import { FindAllBudgetCodeService } from '../../services/find-all-budget-code.service';
import { FindAllSubCategoryService } from '../../services/find-all-sub-category.service';

@Component({
  selector: 'app-budget-code-category-mapping',
  templateUrl: './budget-code-category-mapping.component.html',
  styleUrls: ['./budget-code-category-mapping.component.scss']
})
export class BudgetCodeCategoryMappingComponent {

  public budgetCodeCategoryMasterForm !: FormGroup;
  showMsg: boolean = false;
  budgetCodeList: String[] = undefined as any;
  budgetCategoryNameList: String[] = undefined as any;
  budgetSubCategoryNameList: String[] = undefined as any;

  constructor(private router: Router, private fb: FormBuilder, private findAllBudgetCodeService:FindAllBudgetCodeService, private findAllSubBudgetCategoryNameService:FindAllSubCategoryService, findAllBudgetCategoryNameService:FindAllBudgetCategoryNameService) { }

  textArea: any;
  res: any;
  ngOnInit() {

    this.initBudgetCodeCategoryMasterForm();
    // this.initBudgetCodeList();
    // this.initBudgetCategotryNameList();
    this.initBudgetSubCategotryNameList();
   
  }

  initBudgetCodeCategoryMasterForm() {

    this.budgetCodeCategoryMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],
      'budgetCategoryDescription': ['', [Validators.minLength(4)]]
    });

  }

  
  budgetCodeCategoryMapping() {
    let createBudgetCodeCategoryMappingMasterFormRequest: BudgetCodeData = {
      "budgetCode": this.budgetCodeCategoryMasterForm.value.budgetCode,
      "budgetCategoryName": this.budgetCodeCategoryMasterForm.value.budgetCategoryName,
      "budgetCategoryDescription": this.budgetCodeCategoryMasterForm.value.budgetCategoryDescription

    };
  
}
// initBudgetCodeList(){
//   this.findAllBudgetCodeService.createCategoryDescription().subscribe((res:any)=>{
//     this.budgetCodeList =[];
//     for(const item in res){
//       this.budgetCategoryNameList.push(res[item].budgetCodeDescription);
//     }
//   })
// }

// initBudgetCategotryNameList(){
//   this.findAllBudgetCategoryNameService.createCategoryDescription().subscribe((res:any)=>{
//     this.budgetCategoryNameList =[];
//     for(const item in res){
//       this.budgetCategoryNameList.push(res[item].budgetCategoryDescription);
//     }
//   })
// }

initBudgetSubCategotryNameList(){
  this.findAllSubBudgetCategoryNameService.getBudgetSubCategoryList().subscribe((res:any)=>{
    this.budgetSubCategoryNameList =[];
    for(const item in res){
      this.budgetCategoryNameList.push(res[item].budgetSubCategoryDescription);
    }
  })
}

autogrow() {
  let textArea = document.getElementById("description")
  this.textArea.style.overflow = 'hidden';
  this.textArea.style.height = 'auto';
  this.textArea.style.height = this.textArea.scrollHeight + 'px';
}

}
