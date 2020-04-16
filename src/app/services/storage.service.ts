import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  setStorage(token: string) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  getStorage() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
  }
}
