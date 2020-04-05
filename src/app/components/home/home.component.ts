import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
const moment = require("moment");
import { Data } from "./data.model";
// const keys = require("./keys.json");

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  localLanguage: string;
  english: string;
  darkTheme: boolean;
  // timeOfDay: string;
  data: Data;
  checkBox: boolean;
  showMessage: boolean;
  success: boolean;
  spinner: boolean;

  rowCount: number;

  constructor(private readonly api: ApiService) {
    this.data = new Data();
  }

  ngOnInit(): void {
    this.spinner = false;
    this.showMessage = false;

    this.darkTheme = false;
    if (moment().get("hour") > 17 || moment().get("hour") < 6) {
      this.darkTheme = true;
    } else {
      this.darkTheme = false;
    }
  }

  getInfo() {
    this.api.getInfo().subscribe(async (res: any) => {
      this.rowCount = await res.message;
    });
  }

  async submit(f) {
    this.spinner = true;
    let { English, localLanguage, translation, email } = this.data;
    this.data.English = English.toLowerCase();
    this.data.localLanguage = localLanguage;
    this.data.translation = translation.toLowerCase();
    !email
      ? (this.data.email = "none")
      : (this.data.email = email.toLowerCase());

    this.api.saveDoc(this.data).subscribe(
      (res) => {
        this.showMessage = true;

        this.success = true;
        this.spinner = false;
        this.data = new Data();

        this.getInfo();

        setTimeout(() => {
          this.showMessage = false;
        }, 5000);
      },
      (error) => {
        this.success = false;
        this.spinner = false;
        this.data = new Data();

        setTimeout(() => {
          this.showMessage = false;
        }, 5000);
      }
    );
  }
  checkBoxStatus() {
    !this.checkBox ? (this.data.email = null) : "";
  }
}
