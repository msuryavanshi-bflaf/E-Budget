import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_END_POINTS } from 'src/app/config/api_endpoint.config';
import { POData } from 'src/app/Model/po-generation/po-generation.module';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PoService {

  constructor(private http: HttpClient) { }
  generatepo(generatePORequest: POData): Observable<POData> {
    return this.http.post(environment.javaEndPoint + API_END_POINTS. POGENERATION, generatePORequest).pipe(map((res: any) => {
      return res;
    }))
  }
 
  getPOList(): Observable<POData[]> {
    return this.http.get(environment.javaEndPoint + API_END_POINTS.POLIST).pipe(
      map((res: any) => {
        return (res)
      })
    )
  }
}
