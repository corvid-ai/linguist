import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeskComponent } from "./desk.component";

const routes: Routes = [{ path: "", component: DeskComponent }];
@NgModule({
  declarations: [DeskComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [DeskComponent],
})
export class DeskModule {}
