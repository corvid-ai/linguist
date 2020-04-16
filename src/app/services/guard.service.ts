import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class GuardService {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["auth"]);
      console.log(this.auth.isAuthenticated());
      return false;
    }
    return true;
  }

}
