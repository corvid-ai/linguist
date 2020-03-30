import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
const moment = require("moment");
import { Data } from "./data.model";
// const keys = require("./keys.json");

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  localLanguage: string;
  english: string;
  darkTheme: boolean;
  // timeOfDay: string;
  data: Data;

  constructor(private readonly api: ApiService) {
    this.data = new Data();
  }

  ngOnInit(): void {
    this.darkTheme = false;
    if (moment().get("hour") > 17 || moment().get("hour") < 6) {
      this.darkTheme = true;
    } else {
      this.darkTheme = false;
    }
  }

  async submit(f) {
    this.api.saveDoc(this.data).subscribe(res => {
      const response: any = res;
      console.log(res)
      response.status === 200 ? "" : "";
    });
  }
}
