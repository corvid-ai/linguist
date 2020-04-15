import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DeskComponent } from "./desk.component";

@NgModule({
  declarations: [DeskComponent],
  imports: [CommonModule],
  exports: [DeskComponent],
})
export class DeskModule {}
