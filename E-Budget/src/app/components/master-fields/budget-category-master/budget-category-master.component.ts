import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { BudgetCategoryData } from 'src/app/Model/budget-category/budget-creation.module';
import Swal from 'sweetalert2';

import { BudgetCreationService } from '../../services/budget-category.service';
import { FindAllBudgetCategoryNameService } from '../../services/find-all-budget-category-name.service';

@Component({
  selector: 'app-budget-category-master',
  templateUrl: './budget-category-master.component.html',
  styleUrls: ['./budget-category-master.component.scss']
})
export class BudgetCategoryMasterComponent {

  public budgetCategoryMasterForm !: FormGroup;
  showMsg: boolean = false;
  budgetCategoryNameList:String[]=undefined as any;

  constructor(private router: Router, private fb: FormBuilder,private budgetCategoryService: BudgetCreationService,private FindAllBudgetCategoryNameService:FindAllBudgetCategoryNameService) { }

  textArea: any;

  ngOnInit() {

    this.initBudgetCategoryMasterForm();
    this.initBudgetCategotryNameList()
  }



  initBudgetCategoryMasterForm() {

    this.budgetCategoryMasterForm = this.fb.group({

      'budgetCategoryName': ['', [Validators.minLength(4)]],
      'budgetCategoryDescription': ['', [Validators.minLength(4)]]
    });

  }

  budgetCategoryMaster() {
    let createBudgetCategoryRequest: BudgetCategoryData = {
      "budgetCategoryName": this.budgetCategoryMasterForm.value.budgetCategoryName,
      "budgetCategoryDescription": this.budgetCategoryMasterForm.value.budgetCategoryDescription

    };
    this.budgetCategoryService.createBudgetCategory(createBudgetCategoryRequest).subscribe((data:any)=>{
    //  if(this.budgetCategoryNameList===this.budgetCategoryMasterForm.value.budgetCategoryName)
      
    //     {
    //     Swal.fire('Budget category already exits');
      
    //    }
    //   else{
        Swal.fire('Budget category created successfully')
        this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`])
      // }
      
    })
  
    // Swal.fire('Budget category created successfully')
    // this.router.navigate([`/${AppConstant.BUDGETSUBCATEGORYMASTER}`])
    
  }

  initBudgetCategotryNameList(){
    this.FindAllBudgetCategoryNameService.getBudgetCategoryList().subscribe((res:any)=>{
      this.budgetCategoryNameList =[];
      for(const item in res){
        this.budgetCategoryNameList.push(res[item].budgetCategoryName);
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

