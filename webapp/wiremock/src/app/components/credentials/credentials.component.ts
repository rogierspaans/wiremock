import { Component } from "@angular/core";
import { AuthenticationInterceptor } from "../../services/authentication.interceptor";

@Component({
  selector: "wm-credentials",
  templateUrl: "./credentials.component.html",
  standalone: false,
  styleUrl: "./credentials.component.scss",
  providers: [
    AuthenticationInterceptor
  ]
})
export class CredentialsComponent {
  username: any;
  password: any;

  update() {
    AuthenticationInterceptor.username = this.username;
    AuthenticationInterceptor.password = this.password;

  }
}
