import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { GuardService } from "./services/guard.service";

const routes: Routes = [
  { path: "welcome", component: HomeComponent },
  {
    path: "auth",
    loadChildren: () =>
      import("./components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "desk",
    loadChildren: () =>
      import("./components/desk/desk.module").then((m) => m.DeskModule),
    canActivate: [GuardService],
  },
  { path: "**", pathMatch: "full", redirectTo: "welcome" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
