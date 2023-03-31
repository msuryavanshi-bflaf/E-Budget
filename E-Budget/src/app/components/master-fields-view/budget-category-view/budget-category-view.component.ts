
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/constants/app.constants';

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
  // activeEmployeeData: ActiveEmployee[] = [];
  employee: Employee[] = [
    { value: 'Active Employee', viewValue: 'Active Employee' },
    { value: 'Terminated Employee', viewValue: 'Terminated Employee' },
  ];

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.getActiveEmployee();
  }
  addBudgetCategory() {
    this.router.navigate([AppConstant.BUDGETCATEGORYMASTER]);
  }
  // getActiveEmployeeDetails() {
  //   this.getActiveEmployeeDetails(this.id).subscribe((data: any) => {
  //     // this.activeEmployeeData = data;
  //     // this.router.navigate([AppConstant.VIEW_EMPLOYEE]);
  //   });
  // }

  getActiveEmployee() {
    // this.inviteActiveEmployeeService.getActiveEmployee().subscribe((res: any) => {
    //   this.activeEmployeeData = res;
    // });
  }
  deleteEmployee(data: any) {
    // if (confirm('Are You sure to Delete this record'))
    //   this.inviteActiveEmployeeService.deleteEmployee(data.id).subscribe((res: any) => {
    //   })
    // alert('Record deleted Successfully')
    // this.getActiveEmployee()
  }
  searchEmployee(event: any) {
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

  tableHead = ['Sr No.', 'Employee Name', 'Department Name', 'Work Mail', 'Cost To Company'];
}

