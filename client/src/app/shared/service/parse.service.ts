import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterInterface} from "../interface/Filter.interface";

@Injectable({
  providedIn: 'root'
})

export class ParseService {
  constructor(private http: HttpClient) {

  }

  postParseData(fields: FilterInterface): Observable<any> {
    return this.http.post<any>('/api/parse', fields)
  }
}
