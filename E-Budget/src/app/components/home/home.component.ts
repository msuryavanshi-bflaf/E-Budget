import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetCategoryDetails } from 'src/app/Model/budget-category/budget-creation.module';
import{MatTableDataSource}from '@angular/material/table'
import { BudgetCategoryService } from '../services/budget-category.service';
import { SubCategoryService } from '../services/sub-category.service';
import { SubCategoryData } from 'src/app/Model/sub-category/sub-category.module';
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
  budgetCategoryData: SubCategoryData[] = [];
  event:any;
  tableHead = ['Budget Code.','Remark','Edit','Delete'];
 
  constructor(private router: Router, private http: HttpClient, private budgetSubCategoryService:SubCategoryService, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.getActiveCategory();
  }

  

  getbudgetCategoryDetails() {
    this.budgetSubCategoryService.getActiveBudgetSubCategory().subscribe((data: any) => {
      this.budgetCategoryData = data;
      
    });
  }

  getActiveCategory() {
    this.budgetSubCategoryService.getActiveBudgetSubCategory().subscribe((data: any) => {
      this.budgetCategoryData = data;
    });
  }

  deleteCategory(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.budgetSubCategoryService.deleteSubCategory(data.id).subscribe((res: any) => {
      })
    alert('Record deleted Successfully')
    this.getActiveCategory()
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
