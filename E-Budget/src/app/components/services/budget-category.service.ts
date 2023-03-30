import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { BudgetCategoryData } from 'src/app/Model/budget-category/budget-creation.module';
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

  getBudgetCategoryList(): Observable<BudgetCategoryData[]> {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.BUDGETCATEGORYLIST).pipe(
      map((res: any) => {
        return (res)
      })
    )
  }
}
