import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  public static username: string = '';
  public static password: string = ''
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = request.headers;
    if (AuthenticationInterceptor.username && AuthenticationInterceptor.password) {
      headers = headers.set('authorization', 'Basic ' + btoa(AuthenticationInterceptor.username + ':' + AuthenticationInterceptor.password));
    }
    const clonedRequest =
      request.clone(
        {
          headers
        }
      );
    return next.handle(clonedRequest);

  }
}
