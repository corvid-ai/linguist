import { AfterContentInit, Component, OnInit } from "@angular/core";
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

  svg: d3;
  layout: any;
  tester: HTMLElement;

  response: any;
  words: DataStruc[];
  chartNum: any;
  chartText: any;
  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    this.darkTheme = false;
    if (moment().get("hour") > 17 || moment().get("hour") < 6) {
      this.darkTheme = true;
    } else {
      this.darkTheme = false;
    }
    this.generateData();
  }

  ngAfterContentInit() {
    let element: HTMLElement = document.getElementById(
      "my_dataviz"
    ) as HTMLElement;
    this.tester = element;
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

      if (this.words.length > 0) {
        this.chartNum = [];
        this.chartText = [];
        this.words.filter((w) => {
          this.chartNum.push(w.count);
          this.chartText.push(w.name);
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
    // set the dimensions and margins of the graph
    let margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 450 - margin.left - margin.right;
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
        this.chartText.map((d) => {
          return { text: d };
        })
      )
      .padding(10)
      .fontSize(60)
      .on("end", this.draw);
    this.layout.start();
  }

  draw(words) {
    // console.log(this.svg);
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
      .style("font-size", function (d) {
        return d.size + "px";
      })
      .attr("text-anchor", "middle")
      .attr("transform", function (d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function (d) {
        return d.text;
      });
  }
}

export class DataStruc {
  name: string;
  count: number;
}
