import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { BudgetCreation } from 'src/app/Model/budget-creation/budget-creation.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetCreationService {
  constructor(private http: HttpClient) { }

  createBudget(createBudgetRequest: BudgetCreation): Observable<BudgetCreation> {
    return this.http.post(environment.javaEndPoint + API_END_POINTS.CREATE_BUDGET, createBudgetRequest).pipe(map((res: any) => {
      return res;
    }))
  }

}
