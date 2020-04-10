import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TranslationsComponent } from "./components/translations/translations.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "translations", component: TranslationsComponent },
  { path: "**", pathMatch: "full", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
