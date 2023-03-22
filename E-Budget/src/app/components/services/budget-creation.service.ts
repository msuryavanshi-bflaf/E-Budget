import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { BudgetCreationData } from 'src/app/model/budget-creation/budget-creation.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetCreationService {

  constructor(private http: HttpClient) { }
  createBudgetCategory(createBudgetCategoryRequest: BudgetCreationData): Observable<BudgetCreationData> {
    return this.http.post(environment.javaEndPoint+API_END_POINTS.BUDGET_CATEGORY, createBudgetCategoryRequest).pipe(map((res: any) => {
      return res;
    }))
  }
}
