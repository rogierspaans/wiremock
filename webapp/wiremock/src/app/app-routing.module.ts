import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MappingsComponent } from "./components/mappings/mappings.component";
import { MatchedComponent } from "./components/matched/matched.component";
import { UnmatchedComponent } from "./components/unmatched/unmatched.component";
import { StateComponent } from "./components/state/state.component";
import { FilesComponent } from "./components/files/files.component";
import { CredentialsComponent } from "./components/credentials/credentials.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "mappings",
    pathMatch: "full",
  },
  {
    path: "mappings",
    component: MappingsComponent,
  },
  {
    path: "matched",
    component: MatchedComponent,
  },
  {
    path: "unmatched",
    component: UnmatchedComponent,
  },
  {
    path: "state",
    component: StateComponent,
  },
  {
    path: "files",
    component: FilesComponent,
  },
  {
    path: "credentials",
    component: CredentialsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
