import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { GetBudgetCategoryNameByBudgetCategoryResponse } from 'src/app/Model/budget-category/budget-creation.module';
import { SubCategoryData } from 'src/app/Model/sub-category/sub-category.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FindAllBudgetDescriptionService {

  constructor(private http: HttpClient) { }
  createCategoryDescription(createCategoryDescriptionRequest: SubCategoryData): Observable<SubCategoryData> {
    return this.http.post(environment.javaEndPoint + API_END_POINTS.BUDGETCATEGORYLIST, createCategoryDescriptionRequest).pipe(map((res: any) => {
      return res;
    }))
  }
}
