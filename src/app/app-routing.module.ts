import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { DeskComponent } from "./components/desk/desk.component";
import { HomeComponent } from "./components/home/home.component";
import { TranslationsComponent } from "./components/translations/translations.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "translations", component: TranslationsComponent },
  { path: "desk", component: DeskComponent },
  { path: "auth", component: AuthComponent },
  { path: "**", pathMatch: "full", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
