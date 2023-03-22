import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { GetBudgetCategoryNameByBudgetCategoryResponse } from 'src/app/Model/budget-category/budget-creation.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FindAllBudgetCategoryNameService {


  constructor(private http: HttpClient) { }
  getBudgetCategoryList(): Observable<GetBudgetCategoryNameByBudgetCategoryResponse[]>{
    return this.http.get(environment.javaEndPoint+ API_END_POINTS.BUDGETCATEGORYLIST).pipe(
      map((res:any)=>{
        return(res)
      })
    )
  }
}
