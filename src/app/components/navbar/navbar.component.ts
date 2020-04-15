import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "./../../services/api.service";
const moment = require("moment");

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  darkTheme: boolean;
  @Input() text: string;
  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.darkTheme = false;
    if (moment().get("hour") > 17 || moment().get("hour") < 6) {
      this.darkTheme = true;
    } else {
      this.darkTheme = false;
    }
    // this.getInfo();
  }

  // getInfo() {
  //   this.apiService.getInfo().subscribe(async (res: any) => {
  //     this.rowCount = await res.message;
  //   });
  // }
}
