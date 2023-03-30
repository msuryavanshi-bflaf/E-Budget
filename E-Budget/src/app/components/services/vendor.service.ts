import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_END_POINTS } from '../../config/api_endpoint.config';
import { VendorData } from '../../Model/vendor/vendor.module';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  createVendor(createVendorRequest: VendorData): Observable<VendorData> {
    return this.http.post(environment.javaEndPoint + API_END_POINTS.VENDOR, createVendorRequest).pipe(map((res: any) => {
      return res;
    }))
  }

  getVendorNameList(): Observable<VendorData[]> {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.VENDORNAMELIST).pipe(
      map((res: any) => {
        return (res)
      })
    )
  }
}
