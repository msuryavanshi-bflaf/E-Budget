import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { BudgetCategoryData, BudgetCategoryDetails } from 'src/app/Model/budget-category/budget-creation.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetCategoryService {

  constructor(private http: HttpClient) { }

  createBudgetCategory(createBudgetCategoryRequest: BudgetCategoryData): Observable<BudgetCategoryData> {
    return this.http.post(environment.javaEndPoint + API_END_POINTS.BUDGET_CATEGORY, createBudgetCategoryRequest).pipe(map((res: any) => {
      return res;
    }))
  }

  getActiveCategory(): Observable<BudgetCategoryDetails> {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.BUDGETCATEGORYLIST).pipe(
      map((res: any) => { return (res) })
    );
  }

  // createSalary(createSalaryRequest:SalaryData): Observable<SalaryData> {
  //   return this.http.post( environment.apiUrl+API_END_POINTS.SALARY_DETAILS, createSalaryRequest).pipe(map((res: any) => {
  //     return res;
  //   }))
  // }

  getBudgetCategoryDetails(id: any) {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.BUDGETCATEGORYLIST + id).pipe(
      map((res: any) => { return (res) })
    );
  }

  public deleteCategory(id: any) {
    return this.http.delete(environment.javaEndPoint + API_END_POINTS.DELETECATEGORY + id)
  }

  // activeEmployeeSalary(id: any) {
  //   return this.http.get(environment.apiUrl + API_END_POINTS.ACTIVE_EMPLOYEE_SALARY_DETAILS + id).pipe(
  //     map((res: any) => { return (res) })
  //   );
  // }
 

  // activeEmployeeSalary(createSalaryRequest:SalaryData): Observable<SalaryData> {
  //   return this.http.get( environment.apiUrl+API_END_POINTS. ACTIVE_EMPLOYEE_SALARY_DETAILS).pipe(map((res: any) => {
  //     return res;
  //   }))
  // }

  // generateSalary(id: any) {
  //   return this.http.get(environment.apiUrl + API_END_POINTS.GENERATE_SALRY_SLIP_PDF + id).pipe(
  //     map((res: any) => { return (res) })
  //   );
  // }
 



  getBudgetCategoryList(): Observable<BudgetCategoryData[]> {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.BUDGETCATEGORYLIST).pipe(
      map((res: any) => {
        return (res)
      })
    )
  }

  getAllBudgetCategoryList(): Observable<BudgetCategoryData[]> {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.BUDGETCATEGORYLIST).pipe(
      map((res: any) => {
        return (res)
      })
    )
  }
}
