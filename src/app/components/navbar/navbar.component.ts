import { Component, OnInit } from "@angular/core";
const moment = require("moment");

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  darkTheme: boolean;
  constructor() {}

  ngOnInit(): void {
    this.darkTheme = false;
    if (moment().get("hour") > 17 || moment().get("hour") < 6) {
      this.darkTheme = true;
    } else {
      this.darkTheme = false;
    }
  }
}
