import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InvoiceData } from 'src/app/Model/invoice/invoice.module';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }
  generateInvoice(generatePORequest: InvoiceData): Observable<InvoiceData> {
    return this.http.post(environment.javaEndPoint + API_END_POINTS.INVOICE, generatePORequest).pipe(map((res: any) => {
      return res;
    }))
  }

  getInvoiceList(): Observable<InvoiceData[]> {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.FINDINVOICE).pipe(
      map((res: any) => {
        return (res)
      })
    )
  }
}
