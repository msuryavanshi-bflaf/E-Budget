import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { VendorData } from 'src/app/Model/vendor/vendor.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FindVendorNameListService {

 
  constructor(private http: HttpClient) { }
  getBudgetCategoryList(): Observable<VendorData[]>{
    return this.http.get(environment.javaEndPoint+ API_END_POINTS.VENDORNAMELIST).pipe(
      map((res:any)=>{
        return(res)
      })
    )
  }
}
