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
import { VendorData } from 'src/app/Model/vendor/vendor.module';
import { VendorService } from '../../services/vendor.service';
@Component({
  selector: 'app-vendor-view',
  templateUrl: './vendor-view.component.html',
  styleUrls: ['./vendor-view.component.scss']
})
export class VendorViewComponent {

  id: number | undefined;
  vendorData: VendorData[] = [];
  event:any;
  tableHead = ['Sr.No.', 'Vendor Company Name','Email', 'Address', 'Person Contact Name','Mobile Number','created Date','Edit','Delete'];
 
  constructor(private router: Router, private http: HttpClient, private activeVendor: VendorService, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.getActiveVendor();
  }

  addBudgetCategory() {
    this.router.navigate([AppConstant.BUDGETCATEGORYMASTER]);
  }

  // getbudgetCategoryDetails() {
  //   this.budgetCategoryService.getAllBudgetCategoryList().subscribe((data: any) => {
  //     this.vendorData = data;
      
  //   });
  // }

  getActiveVendor() {
    this.activeVendor.getActiveVendor().subscribe((data: any) => {
      this.vendorData = data;
    });
  }

  deleteCategory(data: any) {
    if (confirm('Are You sure to Delete this record'))
      this.activeVendor.deleteVendor(data.id).subscribe((res: any) => {
      })
    alert('Record deleted Successfully')
    this.getActiveVendor()



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
      length: this.vendorData.length
    });
  }

  pageChanged(event: PageEvent) {
    event.length;
    const budgetCategoryData = [...this.vendorData];
    let dataSource= this.vendorData.splice(
      (event.pageIndex - 1) * event.pageSize,
      event.pageSize
    );
  }
}
