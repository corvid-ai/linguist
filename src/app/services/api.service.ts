import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseUrl = "https://linguist.herokuapp.com/linguist";

  constructor(private http: HttpClient) {}

  saveDoc(data) {
    return this.http.post(this.baseUrl, data);
  }
}
