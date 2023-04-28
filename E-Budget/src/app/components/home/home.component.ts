// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ViewChild } from '@angular/core';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BudgetCategoryDetails } from 'src/app/Model/budget-category/budget-creation.module';
// import{MatTableDataSource}from '@angular/material/table'
// import { BudgetCategoryService } from '../services/budget-category.service';
// export interface Employee {
//   value: string;
//   viewValue: string;

// }

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent {
  
  
//   id: number | undefined;
//   budgetCategoryData: BudgetCategoryDetails[] = [];
//   event:any;
//   tableHead = ['Budget Code.','Remark','Edit','Delete'];
 
//   constructor(private router: Router, private http: HttpClient, private budgetCategoryService: BudgetCategoryService, private route: ActivatedRoute ) { }
//   ngOnInit(): void {
//     this.getActiveCategory();
//   }

  

//   getbudgetCategoryDetails() {
//     this.budgetCategoryService.getAllBudgetCategoryList().subscribe((data: any) => {
//       this.budgetCategoryData = data;
      
//     });
//   }

//   getActiveCategory() {
//     this.budgetCategoryService.getActiveCategory().subscribe((data: any) => {
//       this.budgetCategoryData = data;
//     });
//   }

//   deleteCategory(data: any) {
//     if (confirm('Are You sure to Delete this record'))
//       this.budgetCategoryService.deleteCategory(data.id).subscribe((res: any) => {
//       })
//     alert('Record deleted Successfully')
//     this.getActiveCategory()

//     editCategory(id: String) {
//       // this.currentId = id;
//       // let currentProduct = this.budgetCategoryData.find((data) => { return data.id === id });
//       // this.budgetCategoryMasterForm.setValue({
//       //   budgetCategoryName: currentProduct?.budgetCategoryName,
//       //   remark: currentProduct?.remark,
//       //   status: currentProduct?.status
//       // });
//       // this.editMode = true;
//     }




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

//   }

//   dataSource = new MatTableDataSource([]);
//   @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

//   /**
//    * Set the paginator after the view init since this component will
//    * be able to query its view for the initialized paginator.
//    */
//   ngAfterViewInit() {
//     // this should be moved in API CALL
//     this.pageChanged({
//       pageIndex: 1,
//       pageSize: 10,
//       length: this.budgetCategoryData.length
//     });
//   }

//   pageChanged(event: PageEvent) {
//     event.length;
//     const budgetCategoryData = [...this.budgetCategoryData];
//     let dataSource= this.budgetCategoryData.splice(
//       (event.pageIndex - 1) * event.pageSize,
//       event.pageSize
//     );
//   }
 
// }


import {Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { MatTableDataSource } from '@angular/material/table';
 

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
export class HomeComponent {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  saveData() {
    console.log(this.dataSource);
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];