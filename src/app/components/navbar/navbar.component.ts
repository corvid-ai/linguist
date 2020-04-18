import { CommonModule } from "@angular/common";
import { Component, NgModule, OnInit, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ApiService } from "./../../services/api.service";
const moment = require("moment");

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  darkTheme: boolean;
  @Input("user") user: string;
  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.darkTheme = false;
    if (moment().get("hour") > 17 || moment().get("hour") < 6) {
      this.darkTheme = true;
    } else {
      this.darkTheme = false;
    }
  }
}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavBarModule {}
