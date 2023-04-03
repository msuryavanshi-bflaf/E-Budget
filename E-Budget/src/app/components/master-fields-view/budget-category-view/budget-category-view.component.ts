
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
  event:any;
  tableHead = ['Sr.No.', 'Budget Category Name','Remark', 'Created Date', 'Created By','Status','Delete'];
  p: any = 1;
  count: any= 5;
  constructor(private router: Router, private http: HttpClient, private budgetCategoryService: BudgetCategoryService, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.getActiveCategory();
  }

  addBudgetCategory() {
    this.router.navigate([AppConstant.BUDGETCATEGORYMASTER]);
  }

  getbudgetCategoryDetails() {
    this.budgetCategoryService.getAllBudgetCategoryList().subscribe((data: any) => {
      this.budgetCategoryData = data;
      
    });
  }

  getActiveCategory() {
    this.budgetCategoryService.getActiveCategory().subscribe((data: any) => {
      this.budgetCategoryData = data;
    });
  }

  deleteCategory(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.budgetCategoryService.deleteCategory(data.id).subscribe((res: any) => {
      })
    alert('Record deleted Successfully')
    this.getActiveCategory()



    //  searchCategory(event:any){
    //   let filteredEmployees: BudgetCategoryDetails[] = [];
    //   if (event === '') {
    //     this.getActiveCategory = this.addBudgetCategory;
    //   } else {
    //     filteredEmployees = this.budgetCategoryData.filter((budgetCategoryData, index) => {
    //       let targetKey = budgetCategoryData.budgetCategoryName.toLowerCase();
    //       let searchKey = event.toLowerCase();
    //       return targetKey.includes(searchKey)
    //     })
    //     this.budgetCategoryData = filteredEmployees;
    //   }
    // }

  }

 
}

function searchCategory(event: Event | undefined, any: any) {
  throw new Error('Function not implemented.');
}

