import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { SubCategoryData } from 'src/app/Model/sub-category/sub-category.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  createSubCategory(createSubCategoryRequest: SubCategoryData): Observable<SubCategoryData> {
    return this.http.post(environment.javaEndPoint + API_END_POINTS.SUBCATEGORY, createSubCategoryRequest).pipe(map((res: any) => {
      return res;
    }))
  }

  getActiveBudgetSubCategory(): Observable<SubCategoryData[]> {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.BUDGETSUBCATEGORYLIST).pipe(
      map((res: any) => {
        return (res)
      })
    )
  }

  getBudgetCodeList():Observable<SubCategoryData[]> {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.BUDGETCODELIST).pipe(
      map((res: any) => {
        return (res)
      })
    )
  }

  getBudgetType(){
    
  }
  public deleteSubCategory(id: any) {
    return this.http.delete(environment.javaEndPoint + API_END_POINTS.DELETESUBCATEGORY + id)
  }

}
