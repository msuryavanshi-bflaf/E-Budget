import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetCategoryDetails } from 'src/app/Model/budget-category/budget-creation.module';
import{MatTableDataSource}from '@angular/material/table'
import { BudgetCategoryService } from '../services/budget-category.service';
export interface Employee {
  value: string;
  viewValue: string;

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  
  id: number | undefined;
  budgetCategoryData: BudgetCategoryDetails[] = [];
  event:any;
  tableHead = ['Sr.No.', 'Budget Category Name','Remark', 'Created Date', 'Created By','Status','Edit','Delete'];
 
  constructor(private router: Router, private http: HttpClient, private budgetCategoryService: BudgetCategoryService, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.getActiveCategory();
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


    // editCategory(data:any){

    // }




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

  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    // this should be moved in API CALL
    this.pageChanged({
      pageIndex: 1,
      pageSize: 10,
      length: this.budgetCategoryData.length
    });
  }

  pageChanged(event: PageEvent) {
    event.length;
    const budgetCategoryData = [...this.budgetCategoryData];
    let dataSource= this.budgetCategoryData.splice(
      (event.pageIndex - 1) * event.pageSize,
      event.pageSize
    );
  }
 
}

// function searchCategory(event: Event | undefined, any: any) {
//   throw new Error('Function not implemented.');

// }


