import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  setStorage(token: string) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  setUser(email: string) {
    localStorage.setItem("username", JSON.stringify(email));
  }

  getStorage() {
    return localStorage.getItem("token");
  }

  getUser() {
    return localStorage.getItem("username");
  }

  deleteToken() {
    localStorage.removeItem("token");
  }
}
