import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUrl = "https://linguist.herokuapp.com";
  localUrl = "http://localhost:3000/auth";

  constructor(private http: HttpClient) {}

  saveDoc(data) {
    return this.http.post(this.baseUrl, data);
  }

  getInfo() {
    return this.http.get(this.baseUrl);
  }

  signUp(data) {
    return this.http.post(`${this.localUrl}/signup`, data);
  }

  signIn(data) {
    return this.http.post(`${this.localUrl}/signin`, data);
  }
}
