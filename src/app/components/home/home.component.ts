import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { ApiService } from "./../../services/api.service";
import { Data } from "./data.model";
const moment = require("moment");
// const keys = require("./keys.json");

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild("cloud", { read: ViewContainerRef }) cloud: ViewContainerRef;
  localLanguage: string;
  english: string;
  darkTheme: boolean;
  // timeOfDay: string;
  data: Data;
  checkBox: boolean;
  showMessage: boolean;
  success: boolean;
  spinner: boolean;

  navText: string = "Desk";

  constructor(
    private readonly api: ApiService,
    private factoryResorver: ComponentFactoryResolver
  ) {
    this.data = new Data();
  }

  ngOnInit(): void {
    this.loadComponents();

    this.spinner = false;
    this.showMessage = false;

    this.darkTheme = false;
    if (moment().get("hour") > 17 || moment().get("hour") < 6) {
      this.darkTheme = true;
    } else {
      this.darkTheme = false;
    }
  }

  async loadComponents() {
    const { TranslationsComponent } = await import(
      "../translations/translations.component"
    );
    const translationsFactory = this.factoryResorver.resolveComponentFactory(
      TranslationsComponent
    );
    this.cloud.createComponent(translationsFactory);
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

        // this.getInfo();

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
