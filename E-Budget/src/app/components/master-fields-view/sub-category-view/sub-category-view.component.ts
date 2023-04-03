import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';
import { BudgetCategoryDetails } from 'src/app/Model/budget-category/budget-creation.module';
import { BudgetCategoryService } from '../../services/budget-category.service';
import{  MatTableModule}from '@angular/material/table';
import{MatTableDataSource}from '@angular/material/table'
import { SubCategoryService } from '../../services/sub-category.service';
import { SubCategoryData } from 'src/app/Model/sub-category/sub-category.module';

@Component({
  selector: 'app-sub-category-view',
  templateUrl: './sub-category-view.component.html',
  styleUrls: ['./sub-category-view.component.scss']
})
export class SubCategoryViewComponent {


  id: number | undefined;
  budgetSubCategoryData: SubCategoryData[] = [];
  event:any;
  tableHead = ['Sr.No.', 'Budget Category Name','Budget Sub Category Name', 'Status','Created Date-time', 'Created By','Delete'];
 
  constructor(private router: Router, private http: HttpClient, private budgetSubCategoryService:SubCategoryService, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.getActiveBudgetSubCategory();
  }

  addBudgetCategory() {
    this.router.navigate([AppConstant.BUDGETCATEGORYMASTER]);
  }

  getActiveBudgetSubCategory() {
    this.budgetSubCategoryService.getActiveBudgetSubCategory().subscribe((data: any) => {
      this.budgetSubCategoryData = data;
      
    });
  }

  // getActiveCategory() {
  //   this.budgetSubCategoryService.getActiveCategory().subscribe((data: any) => {
  //     this.budgetCategoryData = data;
  //   });
  // }

  deleteCategory(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.budgetSubCategoryService.deleteSubCategory(data.id).subscribe((res: any) => {
      })
    alert('Record deleted Successfully')
    this.getActiveBudgetSubCategory()



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
      length: this.budgetSubCategoryData.length
    });
  }

  pageChanged(event: PageEvent) {
    event.length;
    const budgetSubCategoryData = [...this.budgetSubCategoryData];
    let dataSource= this.budgetSubCategoryData.splice(
      (event.pageIndex - 1) * event.pageSize,
      event.pageSize
    );
  }
 
}
