import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "./../../services/api.service";
import { StorageService } from "./../../services/storage.service";
import { Auth } from "./auth.model";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  authStatus: string;
  footerMessage: string;
  errorMessage: boolean;
  loading: boolean;

  apiResponse: any;
  showError: boolean;

  userModel: Auth;

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private storageService: StorageService
  ) {
    this.userModel = new Auth();
  }

  ngOnInit(): void {
    this.errorMessage = false;
    this.footerMessage = "Need an account?";
    this.authStatus = "Log In";
  }

  onSubmit() {
    this.authStatus === "Log In" ? this.signIn() : this.signUp();
  }

  signIn() {
    this.errorMessage = false;
    this.loading = true;
    this.apiService.signIn(this.userModel).subscribe(
      (res) => {
        this.loading = false;
        this.apiResponse = res;
        this.storageService.setStorage(this.apiResponse.accessToken);
        this.router.navigate(["desk"]);
      },
      (err) => {
        this.loading = false;
        this.errorMessage = true;
      }
    );
  }

  signUp() {
    this.errorMessage = false;
    this.loading = true;
    this.apiService.signUp(this.userModel).subscribe(
      (res) => {
        this.loading = false;
        this.apiResponse = res;
        this.signIn();
      },
      (err) => {
        this.loading = false;
        this.errorMessage = true;
      }
    );
  }

  changeStatus(e) {
    this.errorMessage = false;
    if (e.target.text == "Sign Up") {
      this.footerMessage = "Already having an Account?";
      this.authStatus = "Sign Up";
    } else {
      this.footerMessage = "Need an account?";
      this.authStatus = "Log In";
    }
  }
}
