import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_END_POINTS } from '../../config/api_endpoint.config';
import { VendorData } from '../../Model/vendor/vendor.module';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient) {}

  createVendor(createVendorRequest: VendorData): Observable<VendorData> {
    return this.http
      .post(
        environment.javaEndPoint + API_END_POINTS.VENDOR,
        createVendorRequest
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getVendorCompanyNameList(): Observable<VendorData[]> {
    return this.http
      .get(environment.javaEndPoint + API_END_POINTS.VENDOR_NAME_LIST)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  editVendor(id: String, createVendorRequest: VendorData): Observable<Object> {
    return this.http.put(
      environment.javaEndPoint + API_END_POINTS.EDIT_VENDOR + id,
      createVendorRequest
    );
  }

  getActiveVendor(): Observable<VendorData[]> {
    return this.http
      .get(environment.javaEndPoint + API_END_POINTS.VENDOR_NAME_LIST)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  public deleteVendor(id: any) {
    return this.http.delete(
      environment.javaEndPoint + API_END_POINTS.DELETE_VENDOR + id
    );
  }
}
