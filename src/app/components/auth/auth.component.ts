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
  apiResponse: any;
  showError: boolean;
  loading: any;

  userModel: Auth;

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private storageService: StorageService
  ) {
    this.userModel = new Auth();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.apiService.signIn(this.userModel).subscribe(
      (res) => {
        this.apiResponse = res;
        console.log(this.apiResponse);
        this.storageService.setStorage(this.apiResponse.accessToken);
        this.router.navigate(["desk"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
