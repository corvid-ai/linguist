import { CommonModule } from "@angular/common";
import { AfterContentInit, Component, NgModule, OnInit } from "@angular/core";
import * as d3 from "d3";
import * as Layout from "d3-cloud";
import { ApiService } from "./../../services/api.service";
const moment = require("moment");

@Component({
  selector: "app-translations",
  templateUrl: "./translations.component.html",
  styleUrls: ["./translations.component.scss"],
})
export class TranslationsComponent implements OnInit, AfterContentInit {
  darkTheme: boolean;
  loading: boolean;

  svg: any;
  layout: any;
  tester: HTMLElement;
  prepare: any;

  response: any;
  words: DataStruc[];
  sizByValue: any;
  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    this.loading = true;
    this.darkTheme = false;
    if (moment().get("hour") > 17 || moment().get("hour") < 6) {
      this.darkTheme = true;
    } else {
      this.darkTheme = false;
    }
  }

  ngAfterContentInit() {
    let element: HTMLElement = document.getElementById(
      "my_dataviz"
    ) as HTMLElement;
    this.tester = element;
    this.generateData();
  }

  generateData() {
    this.api.getInfo().subscribe(async (res: any) => {
      this.response = this.dataFilter(await res.message);
      this.words = [];
      Object.entries(this.response).forEach((w: any) => {
        const target = new DataStruc();
        target.name = w[0];
        target.count = w[1];
        this.words.push(target);
      });

      if (this.words.length > 1) {
        this.sizByValue = [];
        this.words.filter((w) => {
          this.sizByValue.push({ word: w.name, size: w.count });
        });
        this.d3Preparation();
      }
    });
  }

  dataFilter(data) {
    let total = {};
    const filterData = (data) => {
      data.forEach((e) => {
        var key = e[2];
        total[key] = (total[key] || 0) + 1;
      });
    };
    filterData(data);
    return total;
  }

  d3Preparation() {
    this.loading = false;
    // set the dimensions and margins of the graph
    let margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 400 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    this.svg = d3
      .select(this.tester)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    this.layout = Layout()
      .size([width, height])
      .words(
        this.sizByValue.map((d) => {
          return { text: d.word, size: d.size };
        })
      )
      .padding(5)
      .rotate(() => Math.random() * 2 * 90)
      .fontSize((d) => d.size * 20)
      .on("end", (e) => this.drawCloud(e));

    this.layout.start();
  }

  drawCloud(words) {
    this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          this.layout.size()[0] / 2 +
          "," +
          this.layout.size()[1] / 2 +
          ")"
      )
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", (d) => d.size + "px")
      // .style("fill", `rgba(198, 45, 205, 0.8`)
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
      )
      .text((d) => d.text);
  }
}

export class DataStruc {
  name: string;
  count: number;
}

@NgModule({
  declarations: [TranslationsComponent],
  imports: [CommonModule],
})
class TranslationsModule {}
