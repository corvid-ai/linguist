import { StorageService } from "./../../services/storage.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-desk",
  templateUrl: "./desk.component.html",
  styleUrls: ["./desk.component.scss"],
})
export class DeskComponent implements OnInit {
  user: string;
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.user = `Welcome ${this.storageService.getUser().slice(1, -1)}`;
  }
}
