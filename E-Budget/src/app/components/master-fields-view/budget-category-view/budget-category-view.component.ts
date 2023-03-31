
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { BudgetCategoryDetails } from 'src/app/Model/budget-category/budget-creation.module';
import { BudgetCategoryService } from '../../services/budget-category.service';

export interface Employee {
  value: string;
  viewValue: string;

}

@Component({
  selector: 'app-budget-category-view',
  templateUrl: './budget-category-view.component.html',
  styleUrls: ['./budget-category-view.component.scss']
})
export class BudgetCategoryViewComponent implements OnInit {


  id: number | undefined;
  budgetCategoryData: BudgetCategoryDetails[] = [];
  
  tableHead = ['Sr No.', 'Budget Category', 'Created Date', 'Created By', 'Status','Action'];

  constructor(private router: Router, private http: HttpClient, private budgetCategoryService: BudgetCategoryService, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    // this.getActiveCategory();
  }

  addBudgetCategory() {
    this.router.navigate([AppConstant.BUDGETCATEGORYMASTER]);
  }

  getbudgetCategoryDetails() {
    this.budgetCategoryService.getBudgetCategoryDetails(this.id).subscribe((data: any) => {
      this.budgetCategoryData = data;
      // this.router.navigate([AppConstant.VIEW_EMPLOYEE]);
    });
  }

  // getActiveCategory() {
  //   this.budgetCategoryService.getActiveCategory.subscribe((data: any) => {
  //     this.budgetCategoryData = data;
  //   });
  // }
  deleteCategory(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.budgetCategoryService.deleteCategory(data.id).subscribe((res: any) => {
      })
    alert('Record deleted Successfully')
    // this.getActiveEmployee()
  }
  searchCategory(event: any) {
    // let filteredEmployees: ActiveEmployee[] = [];
    // if (event === '') {
    //   this.getActiveEmployee = this.addEmployee;
    // } else {
    //   filteredEmployees = this.activeEmployeeData.filter((activeEmployeeData, index) => {
    //     let targetKey = activeEmployeeData.firstName.toLowerCase();
    //     let searchKey = event.toLowerCase();
    //     return targetKey.includes(searchKey)
    //   })
    //   this.activeEmployeeData = filteredEmployees;
    // }
  }

 
}

