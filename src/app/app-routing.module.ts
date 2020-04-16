import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeskComponent } from "./components/desk/desk.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "desk",
    loadChildren: () =>
      import("./components/desk/desk.module").then((m) => m.DeskModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./components/auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "**", pathMatch: "full", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
