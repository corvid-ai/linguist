import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseUrl = "https://linguist-api.netlify.com/linguist/";

  private httpHeaders = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("X-Frame-Options", "SAMEORIGIN")
    .set("Access-Control-Allow-Origin", "*")
    .set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization,"
    );

  private readonly options = {
    headers: this.httpHeaders
  };
  constructor(private http: HttpClient) {}

  saveDoc(data) {
    return this.http.post(this.baseUrl, data, this.options);
  }
}
