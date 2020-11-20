import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler,
     HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const token = this.loginService.getToken();
    const h = {
        Authorization:  'Bearer ' + token,
      };
    const clone = req.clone({ setHeaders: h });
    return next.handle(clone);
  }
}
