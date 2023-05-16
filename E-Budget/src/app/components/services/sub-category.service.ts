import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import {
  SubCategoryData,
  SubCategoryDetails,
} from 'src/app/Model/sub-category/sub-category.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  constructor(private http: HttpClient) {}

  createSubCategory(
    createSubCategoryRequest: SubCategoryData
  ): Observable<SubCategoryData> {
    return this.http
      .post(
        environment.javaEndPoint + API_END_POINTS.SUB_CATEGORY,
        createSubCategoryRequest
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getActiveBudgetSubCategory(): Observable<SubCategoryDetails[]> {
    return this.http
      .get(environment.javaEndPoint + API_END_POINTS.BUDGET_SUB_CATEGORY_LIST)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getBudgetCodeList(): Observable<SubCategoryDetails[]> {
    return this.http
      .get(environment.javaEndPoint + API_END_POINTS.BUDGET_CODE_LIST)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getBudgetType() {}

  public deleteSubCategory(id: any) {
    return this.http.delete(
      environment.javaEndPoint + API_END_POINTS.DELETE_SUB_CATEGORY + id
    );
  }

  editSubCategory(
    id: String,
    createSubCategoryRequest: SubCategoryData
  ): Observable<Object> {
    return this.http.put(
      environment.javaEndPoint + API_END_POINTS.EDIT_SUB_CATEGORY + id,
      createSubCategoryRequest
    );
  }
}
