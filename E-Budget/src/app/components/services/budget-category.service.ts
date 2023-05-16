import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import {
  BudgetCategoryData,
  BudgetCategoryDetails,
} from 'src/app/Model/budget-category/budget-creation.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BudgetCategoryService {
  constructor(private http: HttpClient) {}

  createBudgetCategory(
    createBudgetCategoryRequest: BudgetCategoryData
  ): Observable<BudgetCategoryData> {
    return this.http
      .post(
        environment.javaEndPoint + API_END_POINTS.BUDGET_CATEGORY,
        createBudgetCategoryRequest
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getActiveCategory(): Observable<BudgetCategoryDetails> {
    return this.http
      .get(environment.javaEndPoint + API_END_POINTS.BUDGET_CATEGORY_LIST)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getBudgetCategoryDetails(id: any) {
    return this.http
      .get(environment.javaEndPoint + API_END_POINTS.BUDGET_CATEGORY_LIST + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  editCategory(
    id: String,
    createBudgetCategoryRequest: BudgetCategoryData
  ): Observable<Object> {
    return this.http.put(
      environment.javaEndPoint + API_END_POINTS.EDIT_CATEGORY + id,
      createBudgetCategoryRequest
    );
  }

  public deleteCategory(id: any) {
    return this.http.delete(
      environment.javaEndPoint + API_END_POINTS.DELETE_CATEGORY + id
    );
  }

  getBudgetCategoryList(): Observable<BudgetCategoryData[]> {
    return this.http
      .get(environment.javaEndPoint + API_END_POINTS.BUDGET_CATEGORY_LIST)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAllBudgetCategoryList(): Observable<BudgetCategoryData[]> {
    return this.http
      .get(environment.javaEndPoint + API_END_POINTS.BUDGET_CATEGORY_LIST)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
