import { StorageService } from "./storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService,
    private readonly storageService: StorageService
  ) {}

  public isAuthenticated(): boolean {
    const token = this.storageService.getStorage();
    return !this.jwtHelper.isTokenExpired(token);
  }
}
